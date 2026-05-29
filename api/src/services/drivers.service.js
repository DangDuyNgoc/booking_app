import { HttpError } from "../common/http-error.js";
import { DriversRepository } from "../repositories/drivers.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { UploadsService } from "./uploads.service.js";

const vehicleTypes = new Set(["MOTORBIKE", "THREE_WHEELER", "TRUCK"]);
const verificationStatuses = new Set(["PENDING", "APPROVED", "REJECTED", "SUSPENDED"]);

const documentFields = [
  ["portrait", "portrait", "driver-portrait"],
  ["idCardFront", "idCardFront", "driver-id-card-front"],
  ["idCardBack", "idCardBack", "driver-id-card-back"],
  ["judicialRecord", "judicialRecord", "driver-judicial-record"],
  ["vehicleRegistration", "vehicleRegistration", "driver-vehicle-registration"],
  ["vehicleInsurance", "vehicleInsurance", "driver-vehicle-insurance"],
  ["healthCertificate", "healthCertificate", "driver-health-certificate"],
  ["vehicleWithPlate", "vehicleWithPlate", "driver-vehicle-with-plate"]
];

const requiredDocumentKeys = new Set([
  "portrait",
  "idCardFront",
  "idCardBack",
  "judicialRecord",
  "vehicleRegistration",
  "vehicleInsurance",
  "vehicleWithPlate"
]);

export class DriversService {
  constructor({
    driversRepository = new DriversRepository(),
    usersRepository = new UsersRepository(),
    uploadsService = new UploadsService()
  } = {}) {
    this.driversRepository = driversRepository;
    this.usersRepository = usersRepository;
    this.uploadsService = uploadsService;
  }

  async submitMyVerification(userId, body = {}, files = {}) {
    const currentProfile = await this.driversRepository.findProfileByUserId(userId);
    const profile = await this.buildDocumentProfile(userId, currentProfile, files);
    const vehicle = this.normalizeVehicle(body.vehicle ?? body, profile);

    const updatedProfile = await this.driversRepository.submitVerification(userId, {
      profile: {
        ...profile,
        verificationStatus: "PENDING",
        rejectionReason: null
      },
      vehicle
    });

    await this.usersRepository.update(userId, { role: "DRIVER" });
    await this.deleteReplacedDocuments(currentProfile, profile);

    return this.toResponse(updatedProfile);
  }

  async getMyVerification(userId) {
    const profile = await this.driversRepository.findProfileByUserId(userId);

    if (!profile) {
      throw new HttpError(404, "Driver verification not found");
    }

    return this.toResponse(profile);
  }

  async listVerifications(query = {}) {
    const page = this.parsePositiveInteger(query.page, 1, 1000);
    const limit = this.parsePositiveInteger(query.limit, 20, 100);
    const status = query.status ? String(query.status).toUpperCase() : undefined;

    if (status && !verificationStatuses.has(status)) {
      throw new HttpError(400, "Invalid verification status");
    }

    const result = await this.driversRepository.findManyVerifications({ status, page, limit });

    return {
      ...result,
      items: result.items.map((profile) => this.toResponse(profile))
    };
  }

  async getVerificationById(id) {
    const profile = await this.findExistingProfile(id);
    return this.toResponse(profile);
  }

  async approveVerification(id) {
    await this.findExistingProfile(id);

    const profile = await this.driversRepository.updateVerificationStatus(id, {
      verificationStatus: "APPROVED",
      rejectionReason: null
    });

    return this.toResponse(profile);
  }

  async rejectVerification(id, body = {}) {
    await this.findExistingProfile(id);
    const rejectionReason = this.requiredText(body.rejectionReason, "rejectionReason");

    const profile = await this.driversRepository.updateVerificationStatus(id, {
      verificationStatus: "REJECTED",
      rejectionReason
    });

    return this.toResponse(profile);
  }

  async findExistingProfile(id) {
    const profile = await this.driversRepository.findProfileById(id);

    if (!profile) {
      throw new HttpError(404, "Driver verification not found");
    }

    return profile;
  }

  async buildDocumentProfile(userId, currentProfile, files) {
    const normalized = {};
    const missingRequiredFields = [];

    for (const [inputKey, fieldPrefix] of documentFields) {
      const file = this.getUploadedFile(files, inputKey);
      const currentAsset = this.getCurrentAsset(currentProfile, fieldPrefix);

      if (!file && !currentAsset?.url && requiredDocumentKeys.has(inputKey)) {
        missingRequiredFields.push(inputKey);
      }
    }

    if (missingRequiredFields.length > 0) {
      throw new HttpError(400, `${missingRequiredFields.join(", ")} is required`);
    }

    for (const [inputKey, fieldPrefix, purpose] of documentFields) {
      const file = this.getUploadedFile(files, inputKey);
      const currentAsset = this.getCurrentAsset(currentProfile, fieldPrefix);
      const asset = file
        ? await this.uploadsService.uploadImage(file, purpose, userId)
        : currentAsset;

      const normalizedAsset = asset ? this.normalizeAsset(asset, inputKey) : null;
      normalized[`${fieldPrefix}Url`] = normalizedAsset?.url ?? null;
      normalized[`${fieldPrefix}PublicId`] = normalizedAsset?.publicId ?? null;
    }

    return normalized;
  }

  getUploadedFile(files, key) {
    const value = files?.[key];

    if (Array.isArray(value)) {
      return value[0] ?? null;
    }

    return value ?? null;
  }

  getCurrentAsset(profile, fieldPrefix) {
    const url = profile?.[`${fieldPrefix}Url`];
    const publicId = profile?.[`${fieldPrefix}PublicId`];

    if (!url || !publicId) {
      return null;
    }

    return { url, publicId };
  }

  normalizeAsset(asset, field) {
    if (typeof asset !== "object") {
      throw new HttpError(400, `${field} must be an object`);
    }

    if (typeof asset.url !== "string" || !asset.url.trim()) {
      throw new HttpError(400, `${field}.url is required`);
    }

    if (typeof asset.publicId !== "string" || !asset.publicId.trim()) {
      throw new HttpError(400, `${field}.publicId is required`);
    }

    return {
      url: asset.url.trim(),
      publicId: asset.publicId.trim()
    };
  }

  normalizeVehicle(vehicle, profile) {
    const vehicleInput = vehicle && typeof vehicle === "object" ? vehicle : {};

    if (!vehicleInput || typeof vehicleInput !== "object") {
      throw new HttpError(400, "vehicle is required");
    }

    const type = String(vehicleInput.type ?? vehicleInput.vehicleType ?? "").toUpperCase();
    if (!vehicleTypes.has(type)) {
      throw new HttpError(400, "vehicle.type is invalid");
    }

    const licensePlate = this.requiredText(vehicleInput.licensePlate, "vehicle.licensePlate");

    return {
      type,
      licensePlate,
      brand: this.optionalText(vehicleInput.brand),
      model: this.optionalText(vehicleInput.model),
      maxWeightKg: this.optionalPositiveInteger(vehicleInput.maxWeightKg, "vehicle.maxWeightKg"),
      imageUrl: profile.vehicleWithPlateUrl,
      imagePublicId: profile.vehicleWithPlatePublicId
    };
  }

  async deleteReplacedDocuments(currentProfile, nextProfile) {
    if (!currentProfile) {
      return;
    }

    for (const [, fieldPrefix] of documentFields) {
      const previousPublicId = currentProfile[`${fieldPrefix}PublicId`];
      const nextPublicId = nextProfile[`${fieldPrefix}PublicId`];

      if (previousPublicId && previousPublicId !== nextPublicId) {
        await this.uploadsService.deleteImage(previousPublicId);
      }
    }
  }

  requiredText(value, field) {
    if (typeof value !== "string" || !value.trim()) {
      throw new HttpError(400, `${field} is required`);
    }

    return value.trim();
  }

  optionalText(value) {
    if (value === undefined || value === null) {
      return null;
    }

    if (typeof value !== "string") {
      return null;
    }

    const trimmed = value.trim();
    return trimmed || null;
  }

  optionalPositiveInteger(value, field) {
    if (value === undefined || value === null || value === "") {
      return null;
    }

    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 1) {
      throw new HttpError(400, `${field} must be a positive integer`);
    }

    return parsed;
  }

  parsePositiveInteger(value, fallback, max) {
    const parsed = Number(value ?? fallback);

    if (!Number.isInteger(parsed) || parsed < 1) {
      return fallback;
    }

    return Math.min(parsed, max);
  }

  toResponse(profile) {
    return {
      id: profile.id,
      userId: profile.userId,
      verificationStatus: profile.verificationStatus,
      availabilityStatus: profile.availabilityStatus ?? null,
      rejectionReason: profile.rejectionReason ?? null,
      user: profile.user
        ? {
            id: profile.user.id,
            fullName: profile.user.fullName ?? null,
            phone: profile.user.phone ?? null,
            email: profile.user.email ?? null,
            isActive: profile.user.isActive
          }
        : undefined,
      documents: Object.fromEntries(
        documentFields.map(([inputKey, fieldPrefix]) => [
          inputKey,
          profile[`${fieldPrefix}Url`]
            ? {
                url: profile[`${fieldPrefix}Url`],
                publicId: profile[`${fieldPrefix}PublicId`]
              }
            : null
        ])
      ),
      vehicle: profile.vehicles?.[0] ?? null
    };
  }
}
