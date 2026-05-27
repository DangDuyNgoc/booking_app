-- CreateEnum
CREATE TYPE "OtpChannel" AS ENUM ('EMAIL', 'PHONE');

-- CreateEnum
CREATE TYPE "OtpPurpose" AS ENUM ('REGISTER', 'LOGIN', 'RESET_PASSWORD');

-- AlterTable
ALTER TABLE "User"
  ADD COLUMN "emailVerifiedAt" TIMESTAMP(3),
  ADD COLUMN "passwordHash" TEXT,
  ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OtpVerification"
  ADD COLUMN "email" TEXT,
  ADD COLUMN "contact" TEXT,
  ADD COLUMN "channel" "OtpChannel" NOT NULL DEFAULT 'PHONE',
  ADD COLUMN "purpose" "OtpPurpose" NOT NULL DEFAULT 'LOGIN',
  ALTER COLUMN "phone" DROP NOT NULL;

-- Backfill existing phone OTP rows.
UPDATE "OtpVerification"
SET "contact" = "phone"
WHERE "contact" IS NULL;

-- AlterTable
ALTER TABLE "OtpVerification"
  ALTER COLUMN "contact" SET NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "OtpVerification_contact_purpose_createdAt_idx" ON "OtpVerification"("contact", "purpose", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
