import { Router } from "express";
import multer from "multer";
import {
  approveVerification,
  getMyVerification,
  getVerificationById,
  listVerifications,
  rejectVerification,
  submitMyVerification,
  updateMyAvailability
} from "../controllers/drivers.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const verificationFields = [
  { name: "portrait", maxCount: 1 },
  { name: "idCardFront", maxCount: 1 },
  { name: "idCardBack", maxCount: 1 },
  { name: "judicialRecord", maxCount: 1 },
  { name: "vehicleRegistration", maxCount: 1 },
  { name: "vehicleInsurance", maxCount: 1 },
  { name: "healthCertificate", maxCount: 1 },
  { name: "vehicleWithPlate", maxCount: 1 }
];

export function createDriversRoutes() {
  const router = Router();

  router.use(requireAuth);
  router.get("/verification", getMyVerification);
  router.post("/verification", upload.fields(verificationFields), submitMyVerification);
  router.patch("/availability", updateMyAvailability);

  router.get("/admin/verifications", requireRole("ADMIN"), listVerifications);
  router.get("/admin/verifications/:id", requireRole("ADMIN"), getVerificationById);
  router.patch("/admin/verifications/:id/approve", requireRole("ADMIN"), approveVerification);
  router.patch("/admin/verifications/:id/reject", requireRole("ADMIN"), rejectVerification);

  return router;
}
