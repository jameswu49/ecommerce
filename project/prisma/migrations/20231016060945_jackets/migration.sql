/*
  Warnings:

  - You are about to drop the column `image1` on the `Jackets` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `Jackets` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `Jackets` table. All the data in the column will be lost.
  - You are about to drop the column `image4` on the `Jackets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jackets" DROP COLUMN "image1",
DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "image4",
ADD COLUMN     "mainImage" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "JacketImages" (
    "id" SERIAL NOT NULL,
    "image1" TEXT DEFAULT '',
    "image2" TEXT DEFAULT '',
    "image3" TEXT DEFAULT '',
    "image4" TEXT DEFAULT '',
    "jacketId" INTEGER NOT NULL,

    CONSTRAINT "JacketImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JacketImages" ADD CONSTRAINT "JacketImages_jacketId_fkey" FOREIGN KEY ("jacketId") REFERENCES "Jackets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
