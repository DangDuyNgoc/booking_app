import { UploadsService } from "../services/uploads.service.js";

const uploadsService = new UploadsService();

export async function uploadImage(req, res, next) {
  try {
    res.json(await uploadsService.uploadImage(req.file, req.body.purpose));
  } catch (error) {
    next(error);
  }
}
