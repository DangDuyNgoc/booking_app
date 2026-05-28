import { createHash, randomInt } from "node:crypto";
import { HttpError } from "../common/http-error.js";
import { assertPassword, comparePassword, hashPassword } from "../common/password.js";
import { assertPhone, normalizePhone } from "../common/phone.js";
import { createAccessToken, createRefreshToken, hashToken, verifyRefreshToken } from "../common/token.js";
import { config } from "../config/env.js";
import { OtpRepository } from "../repositories/otp.repository.js";
import { RefreshTokenRepository } from "../repositories/refresh-token.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { EmailService } from "./email.service.js";
import { SmsService } from "./sms.service.js";

const allowedSelfRegisterRoles = new Set(["CUSTOMER", "DRIVER"]);
const otpPurposes = new Set(["REGISTER", "LOGIN", "RESET_PASSWORD", "VERIFY_CONTACT"]);

export class AuthService {
  constructor({
    otpRepository = new OtpRepository(),
    refreshTokenRepository = new RefreshTokenRepository(),
    usersRepository = new UsersRepository(),
    emailService = new EmailService(),
    smsService = new SmsService()
  } = {}) {
    this.otpRepository = otpRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.usersRepository = usersRepository;
    this.emailService = emailService;
    this.smsService = smsService;
  }

  async register({ email, phone, password, fullName, role = "CUSTOMER" }) {
    const contact = this.normalizeContact(email ?? phone);
    assertPassword(password);

    if (!allowedSelfRegisterRoles.has(role)) {
      throw new HttpError(400, "Invalid role");
    }

    if(!fullName || !fullName.trim() || (!email && !phone)) {
      throw new HttpError(400, "All fields are required");
    }

    await this.assertContactAvailable(contact);

    const user = await this.usersRepository.create({
      email: contact.channel === "EMAIL" ? contact.value : undefined,
      phone: contact.channel === "PHONE" ? contact.value : undefined,
      passwordHash: await hashPassword(password),
      fullName,
      role
    });

    await this.createAndSendOtp(contact, "REGISTER");

    return {
      user: this.toSafeUser(user),
      contact: this.maskContact(contact),
      requiresOtpVerification: true,
      expiresInSeconds: config.otp.ttlMinutes * 60
    };
  }

  async login({ identifier, password }) {
    const contact = this.normalizeContact(identifier);
    const user = await this.findUserByContact(contact);

    if (!user || !user.isActive || !(await comparePassword(password, user.passwordHash))) {
      throw new HttpError(401, "Invalid credentials");
    }

    return this.createSession(user);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new HttpError(401, "refreshToken is required");
    }

    try {
      verifyRefreshToken(refreshToken);
    } catch {
      throw new HttpError(401, "Invalid refresh token");
    }

    const tokenHash = hashToken(refreshToken);
    const storedToken = await this.refreshTokenRepository.findActiveByHash(tokenHash);

    if (!storedToken?.user?.isActive) {
      throw new HttpError(401, "Invalid refresh token");
    }

    await this.refreshTokenRepository.revoke(tokenHash);
    return this.createSession(storedToken.user);
  }

  async logout(refreshToken) {
    if (refreshToken) {
      await this.refreshTokenRepository.revoke(hashToken(refreshToken));
    }

    return { success: true };
  }

  async forgotPassword({ identifier }) {
    const contact = this.normalizeContact(identifier);
    const user = await this.findUserByContact(contact);

    if (user) {
      await this.createAndSendOtp(contact, "RESET_PASSWORD");
    }

    return {
      contact: this.maskContact(contact),
      expiresInSeconds: config.otp.ttlMinutes * 60
    };
  }

  async resetPassword({ identifier, otp, password }) {
    const contact = this.normalizeContact(identifier);
    assertPassword(password);
    const verification = await this.verifyOtpCode(contact, otp, "RESET_PASSWORD");
    const user = await this.findUserByContact(contact);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    if (await comparePassword(password, user.passwordHash)) {
      throw new HttpError(400, "New password must be different from current password");
    }

    await this.otpRepository.markVerified(verification.id);
    await this.usersRepository.updatePassword(user.id, await hashPassword(password));
    await this.refreshTokenRepository.revokeAllForUser(user.id);

    return { success: true };
  }

  async requestOtp(input) {
    const body = typeof input === "object" ? input : { identifier: input, purpose: "LOGIN" };
    const contact = this.normalizeContact(body.identifier ?? body.email ?? body.phone);
    const purpose = this.normalizeOtpPurpose(body.purpose ?? "LOGIN");

    await this.createAndSendOtp(contact, purpose);

    return {
      contact: this.maskContact(contact),
      expiresInSeconds: config.otp.ttlMinutes * 60
    };
  }

  async verifyOtp(input, legacyOtp) {
    const body =
      legacyOtp === undefined ? input : { identifier: input, otp: legacyOtp, purpose: "LOGIN" };
    const contact = this.normalizeContact(body.identifier ?? body.email ?? body.phone);
    const purpose = this.normalizeOtpPurpose(body.purpose ?? "LOGIN");
    const verification = await this.verifyOtpCode(contact, body.otp, purpose);

    await this.otpRepository.markVerified(verification.id);

    const user =
      (await this.findUserByContact(contact)) ??
      (contact.channel === "PHONE"
        ? await this.usersRepository.upsertVerifiedPhoneUser(contact.value)
        : null);

    if (!user) {
      return { verified: true };
    }

    await this.usersRepository.markContactVerified({ id: user.id, channel: contact.channel });
    return this.createSession(user);
  }

  async createSession(user) {
    const safe = this.toSafeUser(user);
    const accessToken = createAccessToken(safe);
    const refreshToken = createRefreshToken(safe);

    await this.refreshTokenRepository.create({
      userId: safe.id,
      tokenHash: hashToken(refreshToken.token),
      expiresAt: refreshToken.expiresAt
    });

    return {
      user: safe,
      accessToken,
      refreshToken: refreshToken.token,
      tokenType: "Bearer",
      expiresInSeconds: 15 * 60,
      refreshExpiresAt: refreshToken.expiresAt.toISOString()
    };
  }

  async createAndSendOtp(contact, purpose) {
    const otp = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + config.otp.ttlMinutes * 60 * 1000);

    await this.otpRepository.revokeActiveByContact?.(contact.value, purpose);

    await this.otpRepository.create({
      phone: contact.channel === "PHONE" ? contact.value : undefined,
      email: contact.channel === "EMAIL" ? contact.value : undefined,
      contact: contact.value,
      channel: contact.channel,
      purpose,
      codeHash: this.hashOtp(contact.value, otp),
      expiresAt
    });

    if (contact.channel === "EMAIL") {
      await this.emailService.sendOtp(contact.value, otp);
    } else {
      await this.smsService.sendOtp(contact.value, otp);
    }

    return otp;
  }

  async verifyOtpCode(contact, otp, purpose) {
    if (!/^[0-9]{6}$/.test(String(otp ?? ""))) {
      throw new HttpError(400, "otp must be a 6 digit code");
    }

    const verification = await this.otpRepository.findLatestActiveByContact(contact.value, purpose);

    if (!verification) {
      throw new HttpError(400, "No active OTP request found");
    }

    if (verification.expiresAt.getTime() < Date.now()) {
      throw new HttpError(400, "OTP has expired");
    }

    if (verification.attempts >= 5) {
      throw new HttpError(400, "OTP attempt limit exceeded");
    }

    if (verification.codeHash !== this.hashOtp(contact.value, otp)) {
      await this.otpRepository.incrementAttempts(verification.id);
      throw new HttpError(401, "Invalid OTP");
    }

    return verification;
  }

  async assertContactAvailable(contact) {
    const existingUser = await this.findUserByContact(contact);

    if (existingUser) {
      throw new HttpError(409, `${contact.channel === "EMAIL" ? "email" : "phone"} already exists`);
    }
  }

  findUserByContact(contact) {
    return contact.channel === "EMAIL"
      ? this.usersRepository.findByEmail(contact.value)
      : this.usersRepository.findByPhone(contact.value);
  }

  normalizeContact(value) {
    if (typeof value !== "string" || !value.trim()) {
      throw new HttpError(400, "email or phone is required");
    }

    const trimmed = value.trim();

    if (trimmed.includes("@")) {
      const email = trimmed.toLowerCase();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new HttpError(400, "Invalid email");
      }

      return { channel: "EMAIL", value: email };
    }

    const phone = normalizePhone(trimmed);
    assertPhone(phone);
    return { channel: "PHONE", value: phone };
  }

  normalizeOtpPurpose(purpose) {
    const normalized = String(purpose).toUpperCase();

    if (!otpPurposes.has(normalized)) {
      throw new HttpError(400, "Invalid OTP purpose");
    }

    return normalized;
  }

  maskContact(contact) {
    if (contact.channel === "EMAIL") {
      const [name, domain] = contact.value.split("@");
      return `${name.slice(0, 2)}***@${domain}`;
    }

    return `${contact.value.slice(0, 4)}***${contact.value.slice(-2)}`;
  }

  toSafeUser(user) {
    return {
      id: user.id,
      email: user.email ?? null,
      phone: user.phone ?? null,
      fullName: user.fullName ?? null,
      avatarUrl: user.avatarUrl ?? null,
      role: user.role,
      isActive: user.isActive,
      emailVerifiedAt: user.emailVerifiedAt ?? null,
      phoneVerifiedAt: user.phoneVerifiedAt ?? null
    };
  }

  hashOtp(contact, otp) {
    return createHash("sha256").update(`${contact}:${otp}:${config.otp.secret}`).digest("hex");
  }
}
