/*
  Warnings:

  - Added the required column `ownerName` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "businessRegistrationUrl" TEXT,
ADD COLUMN     "governmentCertificateUrl" TEXT,
ADD COLUMN     "migrationLicenseUrl" TEXT,
ADD COLUMN     "officePhotoUrl" TEXT,
ADD COLUMN     "operatingCountries" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "ownerName" TEXT NOT NULL,
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedBy" TEXT,
ADD COLUMN     "services" TEXT[] DEFAULT ARRAY[]::TEXT[];
