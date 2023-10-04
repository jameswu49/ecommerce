/*
  Warnings:

  - You are about to drop the column `image_back` on the `Accessories` table. All the data in the column will be lost.
  - You are about to drop the column `image_front` on the `Accessories` table. All the data in the column will be lost.
  - You are about to drop the column `image_back` on the `Jackets` table. All the data in the column will be lost.
  - You are about to drop the column `image_front` on the `Jackets` table. All the data in the column will be lost.
  - You are about to drop the column `image_back` on the `Pants` table. All the data in the column will be lost.
  - You are about to drop the column `image_front` on the `Pants` table. All the data in the column will be lost.
  - You are about to drop the column `image_back` on the `Shirts` table. All the data in the column will be lost.
  - You are about to drop the column `image_front` on the `Shirts` table. All the data in the column will be lost.
  - You are about to drop the column `image_back` on the `Shoes` table. All the data in the column will be lost.
  - You are about to drop the column `image_front` on the `Shoes` table. All the data in the column will be lost.
  - You are about to drop the column `image_back` on the `Sweatshirts` table. All the data in the column will be lost.
  - You are about to drop the column `image_front` on the `Sweatshirts` table. All the data in the column will be lost.
  - You are about to drop the column `image_back` on the `Tops` table. All the data in the column will be lost.
  - You are about to drop the column `image_front` on the `Tops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Accessories" DROP COLUMN "image_back",
DROP COLUMN "image_front",
ADD COLUMN     "image1" TEXT DEFAULT '',
ADD COLUMN     "image2" TEXT DEFAULT '',
ADD COLUMN     "image3" TEXT DEFAULT '',
ADD COLUMN     "image4" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Jackets" DROP COLUMN "image_back",
DROP COLUMN "image_front",
ADD COLUMN     "image1" TEXT DEFAULT '',
ADD COLUMN     "image2" TEXT DEFAULT '',
ADD COLUMN     "image3" TEXT DEFAULT '',
ADD COLUMN     "image4" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Pants" DROP COLUMN "image_back",
DROP COLUMN "image_front",
ADD COLUMN     "image1" TEXT DEFAULT '',
ADD COLUMN     "image2" TEXT DEFAULT '',
ADD COLUMN     "image3" TEXT DEFAULT '',
ADD COLUMN     "image4" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Shirts" DROP COLUMN "image_back",
DROP COLUMN "image_front",
ADD COLUMN     "image1" TEXT DEFAULT '',
ADD COLUMN     "image2" TEXT DEFAULT '',
ADD COLUMN     "image3" TEXT DEFAULT '',
ADD COLUMN     "image4" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Shoes" DROP COLUMN "image_back",
DROP COLUMN "image_front",
ADD COLUMN     "image1" TEXT DEFAULT '',
ADD COLUMN     "image2" TEXT DEFAULT '',
ADD COLUMN     "image3" TEXT DEFAULT '',
ADD COLUMN     "image4" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Sweatshirts" DROP COLUMN "image_back",
DROP COLUMN "image_front",
ADD COLUMN     "image1" TEXT DEFAULT '',
ADD COLUMN     "image2" TEXT DEFAULT '',
ADD COLUMN     "image3" TEXT DEFAULT '',
ADD COLUMN     "image4" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Tops" DROP COLUMN "image_back",
DROP COLUMN "image_front",
ADD COLUMN     "image1" TEXT DEFAULT '',
ADD COLUMN     "image2" TEXT DEFAULT '',
ADD COLUMN     "image3" TEXT DEFAULT '',
ADD COLUMN     "image4" TEXT DEFAULT '';
