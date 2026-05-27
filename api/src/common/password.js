import bcrypt from "bcryptjs";
import { HttpError } from "./http-error.js";

const minPasswordLength = 6;
const saltRounds = 12;

export function assertPassword(password) {
  if (typeof password !== "string" || password.length < minPasswordLength) {
    throw new HttpError(400, "password must be at least 6 characters");
  }
}

export function hashPassword(password) {
  assertPassword(password);
  return bcrypt.hash(password, saltRounds);
}

export function comparePassword(password, passwordHash) {
  if (!passwordHash) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}
