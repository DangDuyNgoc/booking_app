import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploads.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export function createUploadRoutes() {
  const router = Router();

  router.post("/images", upload.single("file"), uploadImage);

  return router;
}
