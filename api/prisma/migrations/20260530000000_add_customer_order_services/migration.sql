-- CreateEnum
CREATE TYPE "OrderServiceType" AS ENUM ('RIDE', 'DELIVERY');

-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('LIGHT', 'BULKY', 'FRAGILE', 'FOOD', 'DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "PackageWeightRange" AS ENUM ('UNDER_5KG', 'KG_5_10', 'KG_10_20', 'KG_20_30', 'OVER_30KG');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "serviceType" "OrderServiceType" NOT NULL DEFAULT 'DELIVERY';
ALTER TABLE "Order" ADD COLUMN "passengerNote" TEXT;
ALTER TABLE "Order" ADD COLUMN "packageType" "PackageType";
ALTER TABLE "Order" ADD COLUMN "packageWeightRange" "PackageWeightRange";
ALTER TABLE "Order" ADD COLUMN "packageNote" TEXT;
ALTER TABLE "Order" ADD COLUMN "recipientName" TEXT;
ALTER TABLE "Order" ADD COLUMN "recipientPhone" TEXT;

-- CreateTable
CREATE TABLE "OrderStatusEvent" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderStatusEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderStatusEvent_orderId_createdAt_idx" ON "OrderStatusEvent"("orderId", "createdAt");

-- AddForeignKey
ALTER TABLE "OrderStatusEvent" ADD CONSTRAINT "OrderStatusEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
