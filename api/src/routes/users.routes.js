import { Router } from "express";
import multer from "multer";
import {
  changeMyPassword,
  deactivateUser,
  deactivateMe,
  getMe,
  getUserById,
  listUsers,
  updateMyAvatar,
  updateMe,
  updateUserRole,
  updateUserStatus
} from "../controllers/users.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export function createUsersRoutes() {
  const router = Router();

  router.use(requireAuth);

  router.get("/me", getMe);
  router.patch("/update-me", updateMe);
  router.patch("/me/avatar", upload.single("file"), updateMyAvatar);
  router.patch("/me/change-password", changeMyPassword);
  router.delete("/me", deactivateMe);

  router.get("/get-all-users", requireRole("ADMIN"), listUsers);
  router.get("/:id", requireRole("ADMIN"), getUserById);
  router.patch("/:id/status", requireRole("ADMIN"), updateUserStatus);
  router.patch("/:id/role", requireRole("ADMIN"), updateUserRole);
  router.delete("/:id", requireRole("ADMIN"), deactivateUser);

  return router;
}
