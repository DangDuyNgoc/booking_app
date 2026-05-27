import { createHash, randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export function createAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
      phone: user.phone,
      type: "access"
    },
    config.jwt.accessTokenSecret,
    { expiresIn: config.jwt.accessTokenTtl }
  );
}

export function createRefreshToken(user) {
  const expiresAt = new Date(Date.now() + config.jwt.refreshTokenDays * 24 * 60 * 60 * 1000);
  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      jti: randomUUID(),
      type: "refresh"
    },
    config.jwt.refreshTokenSecret,
    { expiresIn: config.jwt.refreshTokenTtl }
  );

  return { token, expiresAt };
}

export function verifyAccessToken(token) {
  const payload = jwt.verify(token, config.jwt.accessTokenSecret);

  if (payload.type !== "access") {
    throw new Error("Invalid token type");
  }

  return payload;
}

export function verifyRefreshToken(token) {
  const payload = jwt.verify(token, config.jwt.refreshTokenSecret);

  if (payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  return payload;
}

export function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}
