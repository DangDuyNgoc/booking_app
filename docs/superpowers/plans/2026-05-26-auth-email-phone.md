# Auth Email Phone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build production-oriented auth APIs for register, login, refresh, logout, OTP verification, and password reset using email or phone.

**Architecture:** Keep route/controller/service/repository layers split under `api/src`. Auth service owns business rules and token generation, repositories isolate Prisma calls, email/SMS services isolate delivery, and middleware verifies access tokens for protected routes. Refresh tokens are stored only as hashes in the database and can be revoked.

**Tech Stack:** Express 5, Prisma, PostgreSQL, `node:test`, `bcryptjs`, `jsonwebtoken`, `nodemailer`.

---

### Task 1: Auth Behavior Tests

**Files:**
- Create: `api/tests/auth.service.test.js`

- [ ] **Step 1: Add tests that describe the auth API service contract**

```js
import assert from "node:assert/strict";
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

  return new AuthService({
    usersRepository,
    refreshTokenRepository,
    otpRepository: overrides.otpRepository,
    emailService: overrides.emailService ?? { sendOtp: async () => undefined },
    smsService: overrides.smsService ?? { sendOtp: async () => undefined }
  });
}

test("register creates a password user by email and returns tokens", async () => {
  const service = createService();

  const result = await service.register({
    email: "USER@example.com",
    password: "StrongPass123!",
    fullName: "Test User"
  });

  assert.equal(result.user.email, "user@example.com");
  assert.equal(result.user.phone, null);
  assert.equal(typeof result.accessToken, "string");
  assert.equal(typeof result.refreshToken, "string");
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

async function serviceHash(password) {
  const { hashPassword } = await import("../src/common/password.js");
  return hashPassword(password);
}
```

- [ ] **Step 2: Run tests and verify they fail before implementation**

Run: `node --test tests/auth.service.test.js`

Expected: FAIL because `register`, `login`, and password helper do not exist yet.

### Task 2: Schema And Dependencies

**Files:**
- Modify: `api/package.json`
- Modify: `api/package-lock.json`
- Modify: `api/prisma/schema.prisma`
- Create: `api/prisma/migrations/20260526000000_auth_email_phone/migration.sql`

- [ ] **Step 1: Install auth dependencies**

Run: `npm install bcryptjs jsonwebtoken nodemailer`

- [ ] **Step 2: Add Prisma models and migration**

Add nullable unique email, nullable phone, password hash fields, OTP purpose/contact fields, and `RefreshToken`.

### Task 3: Auth Implementation

**Files:**
- Create: `api/src/middleware/auth.middleware.js`
- Create: `api/src/common/password.js`
- Create: `api/src/common/token.js`
- Create: `api/src/services/email.service.js`
- Modify: `api/src/config/env.js`
- Modify: `api/src/repositories/users.repository.js`
- Modify: `api/src/repositories/otp.repository.js`
- Create: `api/src/repositories/refresh-token.repository.js`
- Modify: `api/src/services/auth.service.js`
- Modify: `api/src/controllers/auth.controller.js`
- Modify: `api/src/routes/auth.routes.js`

- [ ] **Step 1: Implement password, token, SMTP, repositories, service, controller, routes, and middleware**

Use secure storage guidance for clients: mobile stores refresh token in iOS Keychain or Android Keystore, not localStorage.

- [ ] **Step 2: Run verification**

Run:
- `node --test tests/auth.service.test.js`
- `npm run build`
- `node -e "process.env.DATABASE_URL='postgresql://user:pass@localhost:5432/db'; import('./src/routes.js').then(() => console.log('routes import ok'))"`
