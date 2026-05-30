import { HttpError } from "../common/http-error.js";
import { FareConfigsRepository } from "../repositories/fare-configs.repository.js";
import { OrdersRepository } from "../repositories/orders.repository.js";

const orderStatuses = new Set([
  "PENDING",
  "SEARCHING_DRIVER",
  "DRIVER_ASSIGNED",
  "DRIVER_ARRIVING_PICKUP",
  "PICKED_UP",
  "DELIVERING",
  "COMPLETED",
  "CANCELLED"
]);

const cancellableStatuses = new Set([
  "PENDING",
  "SEARCHING_DRIVER",
  "DRIVER_ASSIGNED",
  "DRIVER_ARRIVING_PICKUP"
]);

const serviceTypes = new Set(["RIDE", "DELIVERY"]);
const vehicleTypes = new Set(["MOTORBIKE", "THREE_WHEELER", "TRUCK"]);
const paymentMethods = ["CASH", "WALLET", "BANK_TRANSFER", "VIET_QR"];
const packageTypes = new Set(["LIGHT", "BULKY", "FRAGILE", "FOOD", "DOCUMENT", "OTHER"]);
const packageWeightRanges = new Set(["UNDER_5KG", "KG_5_10", "KG_10_20", "KG_20_30", "OVER_30KG"]);

const packageWeightSurcharges = {
  UNDER_5KG: 0,
  KG_5_10: 5000,
  KG_10_20: 10000,
  KG_20_30: 20000,
  OVER_30KG: 40000
};
const moneyRoundUnit = 1000;

export class CustomersService {
  constructor({
    ordersRepository = new OrdersRepository(),
    fareConfigsRepository = new FareConfigsRepository()
  } = {}) {
    this.ordersRepository = ordersRepository;
    this.fareConfigsRepository = fareConfigsRepository;
  }

  async quoteOrder(body = {}) {
    const input = this.normalizeOrderInput(body);
    const fareConfig = await this.findFareConfig(input.serviceType, input.vehicleType);
    const fare = this.calculateFare(input, fareConfig);

    return {
      serviceType: input.serviceType,
      vehicleType: input.vehicleType,
      paymentMethod: input.paymentMethod,
      distanceKm: fare.distanceKm,
      baseFare: fare.baseFare,
      surcharge: fare.surcharge,
      discount: 0,
      totalFare: fare.totalFare,
      driverPayout: fare.driverPayout
    };
  }

  async createOrder(customerId, body = {}) {
    const input = this.normalizeOrderInput(body);
    const fareConfig = await this.findFareConfig(input.serviceType, input.vehicleType);
    const fare = this.calculateFare(input, fareConfig);
    const order = await this.ordersRepository.createForCustomer(customerId, {
      code: this.generateOrderCode(),
      status: "PENDING",
      serviceType: input.serviceType,
      requestedVehicleType: input.vehicleType,
      paymentMethod: input.paymentMethod,
      pickupAddress: input.pickupAddress,
      pickupLat: input.pickupLat,
      pickupLng: input.pickupLng,
      dropoffAddress: input.dropoffAddress,
      dropoffLat: input.dropoffLat,
      dropoffLng: input.dropoffLng,
      distanceKm: fare.distanceKm,
      baseFare: fare.baseFare,
      surcharge: fare.surcharge,
      discount: 0,
      totalFare: fare.totalFare,
      driverPayout: fare.driverPayout,
      passengerNote: input.serviceType === "RIDE" ? input.passengerNote : null,
      packageType: input.serviceType === "DELIVERY" ? input.packageType : null,
      packageWeightRange: input.serviceType === "DELIVERY" ? input.packageWeightRange : null,
      packageNote: input.serviceType === "DELIVERY" ? input.packageNote : null,
      recipientName: input.serviceType === "DELIVERY" ? input.recipientName : null,
      recipientPhone: input.serviceType === "DELIVERY" ? input.recipientPhone : null
    });

    return this.toResponse(order);
  }

  async listMyOrders(customerId, query = {}) {
    const page = this.parsePositiveInteger(query.page, 1, 1000);
    const limit = this.parsePositiveInteger(query.limit, 20, 100);
    const status = query.status ? String(query.status).toUpperCase() : undefined;

    if (status && !orderStatuses.has(status)) {
      throw new HttpError(400, "Invalid order status");
    }

    const result = await this.ordersRepository.findManyByCustomerId(customerId, {
      page,
      limit,
      status
    });

    return {
      ...result,
      items: result.items.map((item) => this.toResponse(item))
    };
  }

  async getMyOrder(customerId, id) {
    const order = await this.findMyExistingOrder(customerId, id);
    return this.toResponse(order);
  }

  async cancelMyOrder(customerId, id, body = {}) {
    const order = await this.findMyExistingOrder(customerId, id);

    if (!cancellableStatuses.has(order.status)) {
      throw new HttpError(400, "Order cannot be cancelled");
    }

    const updatedOrder = await this.ordersRepository.updateStatus(id, {
      status: "CANCELLED",
      cancelReason: this.optionalText(body.cancelReason ?? body.reason)
    });

    return this.toResponse(updatedOrder);
  }

  listPaymentMethods() {
    return paymentMethods;
  }

  async findMyExistingOrder(customerId, id) {
    const order = await this.ordersRepository.findByIdAndCustomerId(id, customerId);

    if (!order) {
      throw new HttpError(404, "Order not found");
    }

    return order;
  }

  async findFareConfig(serviceType, vehicleType) {
    const fareConfig = await this.fareConfigsRepository.findActiveByServiceAndVehicleType(
      serviceType,
      vehicleType
    );

    if (!fareConfig) {
      throw new HttpError(400, `Active fare config not found for ${serviceType}/${vehicleType}`);
    }

    return fareConfig;
  }

  parsePositiveInteger(value, fallback, max) {
    const parsed = Number(value ?? fallback);

    if (!Number.isInteger(parsed) || parsed < 1) {
      return fallback;
    }

    return Math.min(parsed, max);
  }

  optionalText(value) {
    if (value === undefined || value === null) {
      return null;
    }

    if (typeof value !== "string") {
      throw new HttpError(400, "cancelReason must be a string");
    }

    const trimmed = value.trim();
    return trimmed || null;
  }

  normalizeOrderInput(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new HttpError(400, "order body must be an object");
    }

    const serviceType = String(body.serviceType ?? "").toUpperCase();
    if (!serviceTypes.has(serviceType)) {
      throw new HttpError(400, "Invalid serviceType");
    }

    const paymentMethod = String(body.paymentMethod ?? "CASH").toUpperCase();
    if (!paymentMethods.includes(paymentMethod)) {
      throw new HttpError(400, "Invalid payment method");
    }

    const input = {
      serviceType,
      paymentMethod,
      vehicleType: this.requiredEnum(body.vehicleType, vehicleTypes, "vehicleType"),
      pickupAddress: this.requiredText(body.pickupAddress, "pickupAddress"),
      pickupLat: this.requiredCoordinate(body.pickupLat, "pickupLat", -90, 90),
      pickupLng: this.requiredCoordinate(body.pickupLng, "pickupLng", -180, 180),
      dropoffAddress: this.requiredText(body.dropoffAddress, "dropoffAddress"),
      dropoffLat: this.requiredCoordinate(body.dropoffLat, "dropoffLat", -90, 90),
      dropoffLng: this.requiredCoordinate(body.dropoffLng, "dropoffLng", -180, 180),
      passengerNote: null,
      packageType: null,
      packageWeightRange: null,
      packageNote: null,
      recipientName: null,
      recipientPhone: null
    };

    if (serviceType === "RIDE") {
      input.passengerNote = this.optionalOrderText(body.passengerNote, "passengerNote");
      return input;
    }

    input.packageType = this.requiredEnum(body.packageType, packageTypes, "packageType");
    input.packageWeightRange = this.requiredEnum(
      body.packageWeightRange,
      packageWeightRanges,
      "packageWeightRange"
    );
    input.packageNote = this.optionalOrderText(body.packageNote, "packageNote");
    input.recipientName = this.optionalOrderText(body.recipientName, "recipientName");
    input.recipientPhone = this.optionalOrderText(body.recipientPhone, "recipientPhone");

    return input;
  }

  calculateFare(input, config) {
    const distanceKm = this.calculateDistanceKm(
      input.pickupLat,
      input.pickupLng,
      input.dropoffLat,
      input.dropoffLng
    );
    const minimumKm = Number(config.minimumKm);
    const commissionRate = Number(config.commissionRate);
    const billableKm = Math.max(distanceKm, minimumKm);
    const baseFare = this.roundMoney(config.openingFare + billableKm * config.perKmFare);
    const surcharge =
      input.serviceType === "DELIVERY"
        ? this.roundMoney(packageWeightSurcharges[input.packageWeightRange])
        : 0;
    const totalFare = this.roundMoney(baseFare + surcharge);
    const driverPayout = this.roundMoney(totalFare * (1 - commissionRate / 100));

    return {
      distanceKm,
      baseFare,
      surcharge,
      totalFare,
      driverPayout
    };
  }

  roundMoney(value) {
    return Math.round(Number(value) / moneyRoundUnit) * moneyRoundUnit;
  }

  calculateDistanceKm(pickupLat, pickupLng, dropoffLat, dropoffLng) {
    const earthRadiusKm = 6371;
    const deltaLat = this.toRadians(dropoffLat - pickupLat);
    const deltaLng = this.toRadians(dropoffLng - pickupLng);
    const startLat = this.toRadians(pickupLat);
    const endLat = this.toRadians(dropoffLat);
    const haversine =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(startLat) * Math.cos(endLat) * Math.sin(deltaLng / 2) ** 2;
    const distance = 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));

    return Math.round(distance * 100) / 100;
  }

  toRadians(value) {
    return (value * Math.PI) / 180;
  }

  generateOrderCode() {
    return `ORD${Date.now()}${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
  }

  requiredText(value, field) {
    if (typeof value !== "string" || !value.trim()) {
      throw new HttpError(400, `${field} is required`);
    }

    return value.trim();
  }

  requiredCoordinate(value, field, min, max) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
      throw new HttpError(400, `${field} is invalid`);
    }

    return parsed;
  }

  requiredEnum(value, allowedValues, field) {
    const normalized = String(value ?? "").toUpperCase();

    if (!allowedValues.has(normalized)) {
      throw new HttpError(400, `${field} is required`);
    }

    return normalized;
  }

  optionalOrderText(value, field) {
    if (value === undefined || value === null) {
      return null;
    }

    if (typeof value !== "string") {
      throw new HttpError(400, `${field} must be a string`);
    }

    const trimmed = value.trim();
    return trimmed || null;
  }

  decimalToNumber(value) {
    if (value === undefined || value === null) {
      return null;
    }

    return Number(value);
  }

  toResponse(order) {
    return {
      id: order.id,
      code: order.code,
      customerId: order.customerId,
      driverProfileId: order.driverProfileId ?? null,
      vehicleId: order.vehicleId ?? null,
      requestedVehicleType: order.requestedVehicleType ?? null,
      serviceType: order.serviceType,
      status: order.status,
      paymentMethod: order.paymentMethod,
      pickupAddress: order.pickupAddress,
      pickupLat: this.decimalToNumber(order.pickupLat),
      pickupLng: this.decimalToNumber(order.pickupLng),
      dropoffAddress: order.dropoffAddress,
      dropoffLat: this.decimalToNumber(order.dropoffLat),
      dropoffLng: this.decimalToNumber(order.dropoffLng),
      distanceKm: this.decimalToNumber(order.distanceKm),
      baseFare: order.baseFare,
      surcharge: order.surcharge,
      discount: order.discount,
      totalFare: order.totalFare,
      driverPayout: order.driverPayout,
      pickupProofUrl: order.pickupProofUrl ?? null,
      deliveryProofUrl: order.deliveryProofUrl ?? null,
      cancelReason: order.cancelReason ?? null,
      passengerNote: order.passengerNote ?? null,
      package:
        order.serviceType === "DELIVERY"
          ? {
              type: order.packageType ?? null,
              weightRange: order.packageWeightRange ?? null,
              note: order.packageNote ?? null,
              recipientName: order.recipientName ?? null,
              recipientPhone: order.recipientPhone ?? null
            }
          : null,
      customer: order.customer
        ? {
            id: order.customer.id,
            fullName: order.customer.fullName ?? null,
            phone: order.customer.phone ?? null,
            email: order.customer.email ?? null,
            avatarUrl: order.customer.avatarUrl ?? null
          }
        : undefined,
      driver: order.driverProfile
        ? {
            id: order.driverProfile.id,
            userId: order.driverProfile.userId,
            fullName: order.driverProfile.user?.fullName ?? null,
            phone: order.driverProfile.user?.phone ?? null,
            avatarUrl: order.driverProfile.user?.avatarUrl ?? null
          }
        : null,
      vehicle: order.vehicle ?? null,
      createdAt: order.createdAt ?? null,
      updatedAt: order.updatedAt ?? null,
      completedAt: order.completedAt ?? null
    };
  }
}
