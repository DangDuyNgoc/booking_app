import { HttpError } from "../common/http-error.js";
import { verifyAccessToken } from "../common/token.js";

export function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw new HttpError(401, "Authorization bearer token is required");
    }

    const token = header.slice("Bearer ".length);
    const payload = verifyAccessToken(token);

    req.auth = {
      userId: payload.sub,
      role: payload.role,
      email: payload.email,
      phone: payload.phone
    };

    next();
  } catch (error) {
    next(error instanceof HttpError ? error : new HttpError(401, "Invalid access token"));
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.auth) {
      next(new HttpError(401, "Authentication is required"));
      return;
    }

    if (!roles.includes(req.auth.role)) {
      next(new HttpError(403, "Forbidden"));
      return;
    }

    next();
  };
}
