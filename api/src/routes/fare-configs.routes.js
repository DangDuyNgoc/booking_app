import { Router } from "express";
import {
  activateFareConfig,
  createFareConfig,
  deactivateFareConfig,
  getFareConfig,
  listFareConfigs,
  updateFareConfig
} from "../controllers/fare-configs.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

export function createFareConfigsRoutes() {
  const router = Router();

  router.use(requireAuth, requireRole("ADMIN"));

  router.get("/", listFareConfigs);
  router.post("/", createFareConfig);
  router.get("/:id", getFareConfig);
  router.patch("/:id", updateFareConfig);
  router.patch("/:id/activate", activateFareConfig);
  router.patch("/:id/deactivate", deactivateFareConfig);

  return router;
}
