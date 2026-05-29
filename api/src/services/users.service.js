import { createHash, randomInt } from "node:crypto";
import { assertPhone, normalizePhone } from "../common/phone.js";
import { HttpError } from "../common/http-error.js";
import { assertPassword, comparePassword, hashPassword } from "../common/password.js";
import { config } from "../config/env.js";
import { OtpRepository } from "../repositories/otp.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { EmailService } from "./email.service.js";
import { SmsService } from "./sms.service.js";
import { UploadsService } from "./uploads.service.js";

const roles = new Set(["CUSTOMER", "DRIVER", "ADMIN"]);
const selfProfileFields = new Set(["fullName", "email", "phone"]);

export class UsersService {
  constructor(options = {}) {
    const {
      usersRepository = options instanceof UsersRepository ? options : new UsersRepository(),
      otpRepository = new OtpRepository(),
      emailService = new EmailService(),
      smsService = new SmsService(),
      uploadsService = new UploadsService()
    } = options;

    this.usersRepository = usersRepository;
    this.otpRepository = otpRepository;
    this.emailService = emailService;
    this.smsService = smsService;
    this.uploadsService = uploadsService;
  }

  async getMe(userId) {
    const user = await this.findExistingUser(userId);
    return this.toSafeUser(user);
  }

  async updateMe(userId, body = {}) {
    this.assertAllowedFields(body, selfProfileFields, "update profile");
    const data = {};
    const currentUser = await this.findExistingUser(userId);
    const pendingVerifications = [];

    if (body.fullName !== undefined) {
      const fullName = this.normalizeOptionalText(body.fullName, "fullName");

      if (fullName !== (currentUser.fullName ?? null)) {
        data.fullName = fullName;
      }
    }

    if (body.email !== undefined) {
      const email = this.normalizeEmail(body.email);

      if (email !== currentUser.email) {
        await this.assertEmailAvailable(email, userId);
        data.email = email;
        data.emailVerifiedAt = null;
        pendingVerifications.push({ channel: "EMAIL", value: email });
      }
    }

    if (body.phone !== undefined) {
      const phone = normalizePhone(body.phone);
      assertPhone(phone);

      if (phone !== currentUser.phone) {
        await this.assertPhoneAvailable(phone, userId);
        data.phone = phone;
        data.phoneVerifiedAt = null;
        pendingVerifications.push({ channel: "PHONE", value: phone });
      }
    }

    if (Object.keys(data).length === 0) {
      throw new HttpError(400, "No profile changes detected");
    }

    const user = await this.usersRepository.update(userId, data);
    const verificationContacts = [];

    for (const contact of pendingVerifications) {
      await this.createAndSendContactOtp(contact);
      verificationContacts.push(this.maskContact(contact));
    }

    const safeUser = this.toSafeUser(user);

    if (verificationContacts.length > 0) {
      return {
        ...safeUser,
        requiresContactVerification: true,
        verificationContacts,
        expiresInSeconds: config.otp.ttlMinutes * 60
      };
    }

    return this.toSafeUser(user);
  }

  async updateMyAvatar(userId, file) {
    const currentUser = await this.findExistingUser(userId);
    const uploadedAvatar = await this.uploadsService.uploadImage(file, "user-avatar");
    const user = await this.usersRepository.update(userId, {
      avatarUrl: uploadedAvatar.url,
      avatarPublicId: uploadedAvatar.publicId
    });

    if (currentUser.avatarPublicId && currentUser.avatarPublicId !== uploadedAvatar.publicId) {
      await this.uploadsService.deleteImage(currentUser.avatarPublicId);
    }

    return this.toSafeUser(user);
  }

  async changeMyPassword(userId, { currentPassword, newPassword }) {
    const user = await this.findExistingUser(userId);

    if (!(await comparePassword(currentPassword, user.passwordHash))) {
      throw new HttpError(401, "Current password is incorrect");
    }

    if (await comparePassword(newPassword, user.passwordHash)) {
      throw new HttpError(400, "New password must be different from current password");
    }

    assertPassword(newPassword);
    await this.usersRepository.updatePassword(userId, await hashPassword(newPassword));

    return { success: true };
  }

  async deactivateMe(userId) {
    const user = await this.usersRepository.update(userId, { isActive: false });
    return this.toSafeUser(user);
  }

  async listUsers(query = {}) {
    const page = this.parsePositiveInteger(query.page, 1, 1000);
    const limit = this.parsePositiveInteger(query.limit, 20, 100);
    const role = query.role ? String(query.role).toUpperCase() : undefined;
    const isActive =
      query.isActive === undefined ? undefined : String(query.isActive).toLowerCase() === "true";
    const q = query.q ? String(query.q).trim() : undefined;

    if (role && !roles.has(role)) {
      throw new HttpError(400, "Invalid role");
    }

    const filters = { page, limit };

    if (role) {
      filters.role = role;
    }

    if (typeof isActive === "boolean") {
      filters.isActive = isActive;
    }

    if (q) {
      filters.q = q;
    }

    const result = await this.usersRepository.findMany(filters);

    return {
      ...result,
      items: result.items.map((user) => this.toSafeUser(user))
    };
  }

  async getUserById(id) {
    const user = await this.findExistingUser(id);
    return this.toSafeUser(user);
  }

  async updateUserStatus(id, { isActive }) {
    if (typeof isActive !== "boolean") {
      throw new HttpError(400, "isActive must be a boolean");
    }

    const user = await this.usersRepository.update(id, { isActive });
    return this.toSafeUser(user);
  }

  async updateUserRole(id, { role }) {
    const normalizedRole = String(role ?? "").toUpperCase();

    if (!roles.has(normalizedRole)) {
      throw new HttpError(400, "Invalid role");
    }

    const user = await this.usersRepository.update(id, { role: normalizedRole });
    return this.toSafeUser(user);
  }

  findByPhone(phone) {
    return this.usersRepository.findByPhone(normalizePhone(phone));
  }

  upsertVerifiedPhoneUser(phone, role = "CUSTOMER") {
    return this.usersRepository.upsertVerifiedPhoneUser(normalizePhone(phone), role);
  }

  async findExistingUser(id) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return user;
  }

  async assertEmailAvailable(email, currentUserId) {
    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser && existingUser.id !== currentUserId) {
      throw new HttpError(409, "email already exists");
    }
  }

  async assertPhoneAvailable(phone, currentUserId) {
    const existingUser = await this.usersRepository.findByPhone(phone);

    if (existingUser && existingUser.id !== currentUserId) {
      throw new HttpError(409, "phone already exists");
    }
  }

  parsePositiveInteger(value, fallback, max) {
    const parsed = Number(value ?? fallback);

    if (!Number.isInteger(parsed) || parsed < 1) {
      return fallback;
    }

    return Math.min(parsed, max);
  }

  normalizeOptionalText(value, field) {
    if (value === null) {
      return null;
    }

    if (typeof value !== "string") {
      throw new HttpError(400, `${field} must be a string`);
    }

    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  normalizeEmail(value) {
    if (typeof value !== "string" || !value.trim()) {
      throw new HttpError(400, "email is required");
    }

    const email = value.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new HttpError(400, "Invalid email");
    }

    return email;
  }

  async createAndSendContactOtp(contact) {
    const otp = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + config.otp.ttlMinutes * 60 * 1000);

    await this.otpRepository.revokeActiveByContact(contact.value, "VERIFY_CONTACT");
    await this.otpRepository.create({
      phone: contact.channel === "PHONE" ? contact.value : undefined,
      email: contact.channel === "EMAIL" ? contact.value : undefined,
      contact: contact.value,
      channel: contact.channel,
      purpose: "VERIFY_CONTACT",
      codeHash: this.hashOtp(contact.value, otp),
      expiresAt
    });

    if (contact.channel === "EMAIL") {
      await this.emailService.sendOtp(contact.value, otp);
    } else {
      await this.smsService.sendOtp(contact.value, otp);
    }
  }

  maskContact(contact) {
    if (contact.channel === "EMAIL") {
      const [name, domain] = contact.value.split("@");
      return `${name.slice(0, 2)}***@${domain}`;
    }

    return `${contact.value.slice(0, 4)}***${contact.value.slice(-2)}`;
  }

  hashOtp(contact, otp) {
    return createHash("sha256").update(`${contact}:${otp}:${config.otp.secret}`).digest("hex");
  }

  assertAllowedFields(body, allowedFields, label) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new HttpError(400, `${label} body must be an object`);
    }

    for (const field of Object.keys(body)) {
      if (!allowedFields.has(field)) {
        throw new HttpError(400, `Unsupported ${label} field: ${field}`);
      }
    }
  }

  toSafeUser(user) {
    return {
      id: user.id,
      email: user.email ?? null,
      phone: user.phone ?? null,
      fullName: user.fullName ?? null,
      avatarUrl: user.avatarUrl ?? null,
      avatarPublicId: user.avatarPublicId ?? null,
      role: user.role,
      isActive: user.isActive,
      emailVerifiedAt: user.emailVerifiedAt ?? null,
      phoneVerifiedAt: user.phoneVerifiedAt ?? null,
      createdAt: user.createdAt ?? null,
      updatedAt: user.updatedAt ?? null
    };
  }
}
