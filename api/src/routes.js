import { Router } from "express";
import { createAuthRoutes } from "./routes/auth.routes.js";
import { createDriversRoutes } from "./routes/drivers.routes.js";
import { createHealthRoutes } from "./routes/health.routes.js";
import { createUsersRoutes } from "./routes/users.routes.js";

export function createApiRouter() {
  const router = Router();

  router.use("/health", createHealthRoutes());
  router.use("/auth", createAuthRoutes());
  router.use("/drivers", createDriversRoutes());
  router.use("/users", createUsersRoutes());

  return router;
}
