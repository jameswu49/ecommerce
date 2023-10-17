/*
  Warnings:

  - You are about to drop the `JacketColors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JacketImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jackets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JacketColors" DROP CONSTRAINT "JacketColors_jacketId_fkey";

-- DropForeignKey
ALTER TABLE "JacketImages" DROP CONSTRAINT "JacketImages_colorId_fkey";

-- DropTable
DROP TABLE "JacketColors";

-- DropTable
DROP TABLE "JacketImages";

-- DropTable
DROP TABLE "Jackets";
