-- AlterTable
ALTER TABLE "DriverProfile" ADD COLUMN "portraitUrl" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "portraitPublicId" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "idCardFrontPublicId" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "idCardBackPublicId" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "judicialRecordUrl" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "judicialRecordPublicId" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "vehicleRegistrationUrl" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "vehicleRegistrationPublicId" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "vehicleInsuranceUrl" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "vehicleInsurancePublicId" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "healthCertificateUrl" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "healthCertificatePublicId" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "vehicleWithPlateUrl" TEXT;
ALTER TABLE "DriverProfile" ADD COLUMN "vehicleWithPlatePublicId" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN "imagePublicId" TEXT;
