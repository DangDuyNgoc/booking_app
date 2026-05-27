import { prisma } from "../database/prisma.client.js";

export class OtpRepository {
  create(phoneOrData, codeHash, expiresAt) {
    if (typeof phoneOrData === "object") {
      return prisma.otpVerification.create({
        data: phoneOrData
      });
    }

    return prisma.otpVerification.create({
      data: {
        phone: phoneOrData,
        contact: phoneOrData,
        channel: "PHONE",
        purpose: "LOGIN",
        codeHash,
        expiresAt
      }
    });
  }

  findLatestActive(phone) {
    return prisma.otpVerification.findFirst({
      where: {
        phone,
        verifiedAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  findLatestActiveByContact(contact, purpose) {
    return prisma.otpVerification.findFirst({
      where: {
        contact,
        purpose,
        verifiedAt: null,
        expiresAt: {
          gt: new Date()
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  revokeActiveByContact(contact, purpose) {
    return prisma.otpVerification.updateMany({
      where: {
        contact,
        purpose,
        verifiedAt: null
      },
      data: {
        verifiedAt: new Date()
      }
    });
  }

  incrementAttempts(id) {
    return prisma.otpVerification.update({
      where: { id },
      data: {
        attempts: {
          increment: 1
        }
      }
    });
  }

  markVerified(id) {
    return prisma.otpVerification.update({
      where: { id },
      data: {
        verifiedAt: new Date()
      }
    });
  }
}
