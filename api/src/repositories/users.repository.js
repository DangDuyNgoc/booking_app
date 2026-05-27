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
