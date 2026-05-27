import { prisma } from "../database/prisma.client.js";

export class RefreshTokenRepository {
  create({ userId, tokenHash, expiresAt }) {
    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt
      }
    });
  }

  findActiveByHash(tokenHash) {
    return prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        revokedAt: null,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: true
      }
    });
  }

  revoke(tokenHash) {
    return prisma.refreshToken.updateMany({
      where: {
        tokenHash,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    });
  }

  revokeAllForUser(userId) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    });
  }
}
