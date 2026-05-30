-- AlterTable
ALTER TABLE "FareConfig" ADD COLUMN "serviceType" "OrderServiceType" NOT NULL DEFAULT 'DELIVERY';

-- CreateIndex
CREATE INDEX "FareConfig_serviceType_isActive_idx" ON "FareConfig"("serviceType", "isActive");
