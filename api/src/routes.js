import { Router } from "express";
import { createAuthRoutes } from "./routes/auth.routes.js";
import { createHealthRoutes } from "./routes/health.routes.js";
import { createUploadRoutes } from "./routes/uploads.routes.js";

export function createApiRouter() {
  const router = Router();

  router.use("/health", createHealthRoutes());
  router.use("/auth", createAuthRoutes());
  router.use("/uploads", createUploadRoutes());

  return router;
}
