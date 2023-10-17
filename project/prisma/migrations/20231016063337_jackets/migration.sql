/*
  Warnings:

  - You are about to drop the column `jacketId` on the `JacketImages` table. All the data in the column will be lost.
  - Added the required column `colorId` to the `JacketImages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JacketImages" DROP CONSTRAINT "JacketImages_jacketId_fkey";

-- AlterTable
ALTER TABLE "JacketImages" DROP COLUMN "jacketId",
ADD COLUMN     "colorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "JacketColors" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "jacketId" INTEGER NOT NULL,

    CONSTRAINT "JacketColors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JacketColors" ADD CONSTRAINT "JacketColors_jacketId_fkey" FOREIGN KEY ("jacketId") REFERENCES "Jackets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketImages" ADD CONSTRAINT "JacketImages_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "JacketColors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
