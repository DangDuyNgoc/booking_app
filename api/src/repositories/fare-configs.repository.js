import { prisma } from "../database/prisma.client.js";

export class FareConfigsRepository {
  async findMany({ page = 1, limit = 20, serviceType, vehicleType, isActive } = {}) {
    const where = {
      ...(serviceType ? { serviceType } : {}),
      ...(vehicleType ? { vehicleType } : {}),
      ...(typeof isActive === "boolean" ? { isActive } : {})
    };
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.fareConfig.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: "desc" }
      }),
      prisma.fareConfig.count({ where })
    ]);

    return { items, total, page, limit };
  }

  findById(id) {
    return prisma.fareConfig.findUnique({
      where: { id }
    });
  }

  create(data) {
    return prisma.fareConfig.create({
      data
    });
  }

  update(id, data) {
    return prisma.fareConfig.update({
      where: { id },
      data
    });
  }

  async activateOnly(id, { serviceType, vehicleType }) {
    return prisma.$transaction(async (tx) => {
      await tx.fareConfig.updateMany({
        where: {
          serviceType,
          vehicleType,
          id: { not: id }
        },
        data: { isActive: false }
      });

      return tx.fareConfig.update({
        where: { id },
        data: { isActive: true }
      });
    });
  }

  findActiveByServiceAndVehicleType(serviceType, vehicleType) {
    return prisma.fareConfig.findFirst({
      where: {
        serviceType,
        vehicleType,
        isActive: true
      },
      orderBy: { updatedAt: "desc" }
    });
  }
}
