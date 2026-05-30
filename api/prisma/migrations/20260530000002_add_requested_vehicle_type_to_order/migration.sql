-- AlterTable
ALTER TABLE "Order" ADD COLUMN "requestedVehicleType" "VehicleType";

-- DropIndex
DROP INDEX IF EXISTS "FareConfig_serviceType_isActive_idx";

-- CreateIndex
CREATE INDEX "FareConfig_serviceType_vehicleType_isActive_idx" ON "FareConfig"("serviceType", "vehicleType", "isActive");
