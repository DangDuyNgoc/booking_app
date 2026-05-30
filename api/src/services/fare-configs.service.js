import { HttpError } from "../common/http-error.js";
import { FareConfigsRepository } from "../repositories/fare-configs.repository.js";

const serviceTypes = new Set(["RIDE", "DELIVERY"]);
const vehicleTypes = new Set(["MOTORBIKE", "THREE_WHEELER", "TRUCK"]);

const createFields = new Set([
  "serviceType",
  "vehicleType",
  "openingFare",
  "minimumKm",
  "perKmFare",
  "commissionRate",
  "isActive"
]);

const updateFields = new Set([
  "serviceType",
  "vehicleType",
  "openingFare",
  "minimumKm",
  "perKmFare",
  "commissionRate",
  "isActive"
]);

export class FareConfigsService {
  constructor({ fareConfigsRepository = new FareConfigsRepository() } = {}) {
    this.fareConfigsRepository = fareConfigsRepository;
  }

  async listFareConfigs(query = {}) {
    const page = this.parsePositiveInteger(query.page, 1, 1000);
    const limit = this.parsePositiveInteger(query.limit, 20, 100);
    const serviceType = query.serviceType
      ? this.normalizeEnum(query.serviceType, serviceTypes, "serviceType")
      : undefined;
    const vehicleType = query.vehicleType
      ? this.normalizeEnum(query.vehicleType, vehicleTypes, "vehicleType")
      : undefined;
    const isActive =
      query.isActive === undefined ? undefined : String(query.isActive).toLowerCase() === "true";

    const result = await this.fareConfigsRepository.findMany({
      page,
      limit,
      serviceType,
      vehicleType,
      isActive
    });

    return {
      ...result,
      items: result.items.map((item) => this.toResponse(item))
    };
  }

  async getFareConfig(id) {
    return this.toResponse(await this.findExistingFareConfig(id));
  }

  async createFareConfig(body = {}) {
    this.assertAllowedFields(body, createFields, "fare config");
    const data = this.normalizeFareConfig(body, { partial: false });
    const fareConfig = data.isActive
      ? await this.fareConfigsRepository.create({ ...data, isActive: false })
      : await this.fareConfigsRepository.create(data);

    if (!data.isActive) {
      return this.toResponse(fareConfig);
    }

    const activated = await this.fareConfigsRepository.activateOnly(fareConfig.id, {
      serviceType: fareConfig.serviceType,
      vehicleType: fareConfig.vehicleType
    });

    return this.toResponse(activated);
  }

  async updateFareConfig(id, body = {}) {
    this.assertAllowedFields(body, updateFields, "fare config");
    await this.findExistingFareConfig(id);
    const data = this.normalizeFareConfig(body, { partial: true });

    if (Object.keys(data).length === 0) {
      throw new HttpError(400, "No fare config changes detected");
    }

    const fareConfig = await this.fareConfigsRepository.update(id, data);
    return this.toResponse(fareConfig);
  }

  async activateFareConfig(id) {
    const fareConfig = await this.findExistingFareConfig(id);
    const activated = await this.fareConfigsRepository.activateOnly(id, {
      serviceType: fareConfig.serviceType,
      vehicleType: fareConfig.vehicleType
    });

    return this.toResponse(activated);
  }

  async deactivateFareConfig(id) {
    await this.findExistingFareConfig(id);
    const fareConfig = await this.fareConfigsRepository.update(id, { isActive: false });
    return this.toResponse(fareConfig);
  }

  async findExistingFareConfig(id) {
    const fareConfig = await this.fareConfigsRepository.findById(id);

    if (!fareConfig) {
      throw new HttpError(404, "Fare config not found");
    }

    return fareConfig;
  }

  normalizeFareConfig(body, { partial }) {
    const data = {};

    if (!partial || body.serviceType !== undefined) {
      data.serviceType = this.normalizeEnum(body.serviceType, serviceTypes, "serviceType");
    }

    if (!partial || body.vehicleType !== undefined) {
      data.vehicleType = this.normalizeEnum(body.vehicleType, vehicleTypes, "vehicleType");
    }

    if (!partial || body.openingFare !== undefined) {
      data.openingFare = this.positiveInteger(body.openingFare, "openingFare");
    }

    if (!partial || body.minimumKm !== undefined) {
      data.minimumKm = this.nonNegativeNumber(body.minimumKm, "minimumKm");
    }

    if (!partial || body.perKmFare !== undefined) {
      data.perKmFare = this.positiveInteger(body.perKmFare, "perKmFare");
    }

    if (!partial || body.commissionRate !== undefined) {
      data.commissionRate = this.commissionRate(body.commissionRate);
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        throw new HttpError(400, "isActive must be a boolean");
      }

      data.isActive = body.isActive;
    } else if (!partial) {
      data.isActive = false;
    }

    return data;
  }

  normalizeEnum(value, allowedValues, field) {
    const normalized = String(value ?? "").toUpperCase();

    if (!allowedValues.has(normalized)) {
      throw new HttpError(400, `Invalid ${field}`);
    }

    return normalized;
  }

  positiveInteger(value, field) {
    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed < 1) {
      throw new HttpError(400, `${field} must be a positive integer`);
    }

    return parsed;
  }

  nonNegativeNumber(value, field) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 0) {
      throw new HttpError(400, `${field} must be a non-negative number`);
    }

    return parsed;
  }

  commissionRate(value) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
      throw new HttpError(400, "commissionRate must be between 0 and 100");
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

  assertAllowedFields(body, allowedFields, label) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new HttpError(400, `${label} body must be an object`);
    }

    for (const field of Object.keys(body)) {
      if (!allowedFields.has(field)) {
        throw new HttpError(400, `Unsupported ${label} field: ${field}`);
      }
    }
  }

  toResponse(fareConfig) {
    return {
      id: fareConfig.id,
      serviceType: fareConfig.serviceType,
      vehicleType: fareConfig.vehicleType,
      openingFare: fareConfig.openingFare,
      minimumKm: Number(fareConfig.minimumKm),
      perKmFare: fareConfig.perKmFare,
      commissionRate: Number(fareConfig.commissionRate),
      isActive: fareConfig.isActive,
      createdAt: fareConfig.createdAt ?? null,
      updatedAt: fareConfig.updatedAt ?? null
    };
  }
}
