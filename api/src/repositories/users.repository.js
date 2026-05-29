import { prisma } from "../database/prisma.client.js";

export class UsersRepository {
  create(data) {
    return prisma.user.create({
      data
    });
  }

  findById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  findByPhone(phone) {
    return prisma.user.findUnique({
      where: { phone }
    });
  }

  async findMany({ page = 1, limit = 20, role, isActive, q } = {}) {
    const where = {
      ...(role ? { role } : {}),
      ...(typeof isActive === "boolean" ? { isActive } : {}),
      ...(q
        ? {
            OR: [
              { email: { contains: q, mode: "insensitive" } },
              { phone: { contains: q } },
              { fullName: { contains: q, mode: "insensitive" } }
            ]
          }
        : {})
    };
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.user.count({ where })
    ]);

    return { items, total, page, limit };
  }

  update(id, data) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  updatePassword(id, passwordHash) {
    return prisma.user.update({
      where: { id },
      data: { passwordHash }
    });
  }

  markContactVerified({ id, channel }) {
    return prisma.user.update({
      where: { id },
      data: channel === "EMAIL" ? { emailVerifiedAt: new Date() } : { phoneVerifiedAt: new Date() }
    });
  }

  upsertVerifiedPhoneUser(phone, role = "CUSTOMER") {
    return prisma.user.upsert({
      where: { phone },
      update: {
        phoneVerifiedAt: new Date(),
        isActive: true
      },
      create: {
        phone,
        role,
        phoneVerifiedAt: new Date()
      }
    });
  }
}
