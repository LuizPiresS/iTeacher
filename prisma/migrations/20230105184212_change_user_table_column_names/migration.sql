/*
  Warnings:

  - You are about to drop the column `addressCity` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `addressCountry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `addressState` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `addressStreet` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `addressZip` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "addressCity",
DROP COLUMN "addressCountry",
DROP COLUMN "addressState",
DROP COLUMN "addressStreet",
DROP COLUMN "addressZip",
DROP COLUMN "createdAt",
DROP COLUMN "dateOfBirth",
DROP COLUMN "deletedAt",
DROP COLUMN "isActive",
DROP COLUMN "isVerified",
DROP COLUMN "photoUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "address_city" TEXT,
ADD COLUMN     "address_country" TEXT,
ADD COLUMN     "address_state" TEXT,
ADD COLUMN     "address_street" TEXT,
ADD COLUMN     "address_zip" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_of_birth" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
