import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { AuthService } from "../src/services/auth.service.js";

function createService(overrides = {}) {
  const usersRepository = {
    findByEmail: async () => null,
    findByPhone: async () => null,
    create: async (data) => ({ id: "user-1", role: "CUSTOMER", isActive: true, ...data }),
    updatePassword: async (id) => ({ id }),
    markContactVerified: async () => undefined,
    ...overrides.usersRepository
  };

  const refreshTokenRepository = {
    create: async () => undefined,
    findActiveByHash: async () => null,
    revoke: async () => undefined,
    revokeAllForUser: async () => undefined,
    ...overrides.refreshTokenRepository
  };

  const otpRepository = {
    create: async () => undefined,
    findLatestActiveByContact: async () => null,
    incrementAttempts: async () => undefined,
    markVerified: async () => undefined,
    revokeActiveByContact: async () => undefined,
    ...overrides.otpRepository
  };

  return new AuthService({
    usersRepository,
    refreshTokenRepository,
    otpRepository,
    emailService: overrides.emailService ?? { sendOtp: async () => undefined },
    smsService: overrides.smsService ?? { sendOtp: async () => undefined }
  });
}

test("register creates a password user by email and sends a verification OTP", async () => {
  const sentOtps = [];
  const service = createService();
  service.emailService = {
    sendOtp: async (email, otp) => sentOtps.push({ email, otp })
  };

  const result = await service.register({
    email: "USER@example.com",
    password: "StrongPass123!",
    fullName: "Test User"
  });

  assert.equal(result.user.email, "user@example.com");
  assert.equal(result.user.phone, null);
  assert.equal(result.requiresOtpVerification, true);
  assert.equal(result.accessToken, undefined);
  assert.equal(result.refreshToken, undefined);
  assert.equal(sentOtps.length, 1);
  assert.equal(sentOtps[0].email, "user@example.com");
  assert.match(sentOtps[0].otp, /^[0-9]{6}$/);
});

test("login rejects an invalid password", async () => {
  const service = createService({
    usersRepository: {
      findByEmail: async () => ({
        id: "user-1",
        email: "user@example.com",
        phone: null,
        passwordHash: await serviceHash("StrongPass123!"),
        role: "CUSTOMER",
        isActive: true
      })
    }
  });

  await assert.rejects(
    () => service.login({ identifier: "user@example.com", password: "WrongPass123!" }),
    /Invalid credentials/
  );
});

test("reset password rejects the current password", async () => {
  const currentPasswordHash = await serviceHash("StrongPass123!");
  const service = createService({
    usersRepository: {
      findByEmail: async () => ({
        id: "user-1",
        email: "user@example.com",
        phone: null,
        passwordHash: currentPasswordHash,
        role: "CUSTOMER",
        isActive: true
      })
    },
    otpRepository: {
      findLatestActiveByContact: async () => ({
        id: "otp-1",
        contact: "user@example.com",
        purpose: "RESET_PASSWORD",
        codeHash: serviceHashOtp("user@example.com", "123456"),
        attempts: 0,
        expiresAt: new Date(Date.now() + 60_000)
      }),
      incrementAttempts: async () => undefined,
      markVerified: async () => undefined
    }
  });

  await assert.rejects(
    () =>
      service.resetPassword({
        identifier: "user@example.com",
        otp: "123456",
        password: "StrongPass123!"
      }),
    /New password must be different from current password/
  );
});

async function serviceHash(password) {
  const { hashPassword } = await import("../src/common/password.js");
  return hashPassword(password);
}

function serviceHashOtp(contact, otp) {
  return createHash("sha256").update(`${contact}:${otp}:${process.env.OTP_SECRET}`).digest("hex");
}
