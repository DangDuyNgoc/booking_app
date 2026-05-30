import { prisma } from "../database/prisma.client.js";

const orderInclude = {
  customer: {
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      avatarUrl: true
    }
  },
  driverProfile: {
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          phone: true,
          avatarUrl: true
        }
      }
    }
  },
  vehicle: true
};

export class OrdersRepository {
  async findManyByCustomerId(customerId, { page = 1, limit = 20, status } = {}) {
    const where = {
      customerId,
      ...(status ? { status } : {})
    };
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: orderInclude
      }),
      prisma.order.count({ where })
    ]);

    return { items, total, page, limit };
  }

  findByIdAndCustomerId(id, customerId) {
    return prisma.order.findFirst({
      where: { id, customerId },
      include: orderInclude
    });
  }

  async createForCustomer(customerId, data) {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerId,
          ...data
        },
        include: orderInclude
      });

      await tx.orderStatusEvent.create({
        data: {
          orderId: order.id,
          status: order.status,
          message: "Order created"
        }
      });

      return order;
    });
  }

  updateStatus(id, data) {
    return prisma.order.update({
      where: { id },
      data,
      include: orderInclude
    });
  }
}
