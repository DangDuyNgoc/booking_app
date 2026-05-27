import { v2 as cloudinary } from "cloudinary";
import { HttpError } from "../common/http-error.js";
import { config } from "../config/env.js";
import { imagePurposes, purposeFolders } from "../uploads/uploads.constants.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

export class UploadsService {
  async uploadImage(file, purpose) {
    if (!imagePurposes.includes(purpose)) {
      throw new HttpError(400, "Invalid image purpose");
    }

    if (!file) {
      throw new HttpError(400, "Image file is required");
    }

    if (!file.mimetype.startsWith("image/")) {
      throw new HttpError(400, "Only image files are allowed");
    }

    const result = await this.uploadBuffer(file.buffer, purposeFolders[purpose]);

    return {
      purpose,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    };
  }

  uploadBuffer(buffer, folder) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image"
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }

          resolve(result);
        }
      );

      stream.end(buffer);
    });
  }
}
