import { prisma } from "../database/prisma.client.js";

export class DriversRepository {
  findProfileByUserId(userId) {
    return prisma.driverProfile.findUnique({
      where: { userId },
      include: {
        vehicles: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });
  }

  findProfileById(id) {
    return prisma.driverProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
            isActive: true
          }
        },
        vehicles: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });
  }

  async findManyVerifications({ status, page = 1, limit = 20 } = {}) {
    const where = {
      ...(status ? { verificationStatus: status } : {})
    };
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.driverProfile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              email: true,
              isActive: true
            }
          },
          vehicles: {
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
            take: 1
          }
        }
      }),
      prisma.driverProfile.count({ where })
    ]);

    return { items, total, page, limit };
  }

  updateVerificationStatus(id, data) {
    return prisma.driverProfile.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
            isActive: true
          }
        },
        vehicles: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });
  }

  async submitVerification(userId, data) {
    return prisma.$transaction(async (tx) => {
      const profile = await tx.driverProfile.upsert({
        where: { userId },
        create: {
          userId,
          ...data.profile
        },
        update: data.profile
      });

      const existingVehicle = await tx.vehicle.findFirst({
        where: { driverProfileId: profile.id, isActive: true },
        orderBy: { createdAt: "desc" }
      });

      if (existingVehicle) {
        await tx.vehicle.update({
          where: { id: existingVehicle.id },
          data: data.vehicle
        });
      } else {
        await tx.vehicle.create({
          data: {
            driverProfileId: profile.id,
            ...data.vehicle
          }
        });
      }

      return tx.driverProfile.findUnique({
        where: { id: profile.id },
        include: {
          vehicles: {
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
            take: 1
          }
        }
      });
    });
  }
}
