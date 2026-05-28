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
