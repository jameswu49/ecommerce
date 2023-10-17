/*
  Warnings:

  - You are about to drop the column `image1` on the `JacketColors` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `JacketColors` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `JacketColors` table. All the data in the column will be lost.
  - You are about to drop the column `image4` on the `JacketColors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JacketColors" DROP COLUMN "image1",
DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "image4";
