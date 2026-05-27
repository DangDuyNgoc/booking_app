import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
  requestOtp,
  resetPassword,
  verifyOtp
} from "../controllers/auth.controller.js";

export function createAuthRoutes() {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);
  router.post("/refresh", refresh);
  router.post("/logout", logout);
  router.post("/forgot-password", forgotPassword);
  router.post("/reset-password", resetPassword);
  router.post("/request-otp", requestOtp);
  router.post("/verify-otp", verifyOtp);

  return router;
}
