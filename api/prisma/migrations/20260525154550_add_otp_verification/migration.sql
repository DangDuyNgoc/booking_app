-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneVerifiedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "OtpVerification" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OtpVerification_phone_createdAt_idx" ON "OtpVerification"("phone", "createdAt");
