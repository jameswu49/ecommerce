/*
  Warnings:

  - You are about to drop the column `image_url` on the `Accessories` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Jackets` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Pants` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Shirts` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Shoes` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Sweatshirts` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Tops` table. All the data in the column will be lost.
  - Added the required column `image_back` to the `Accessories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `Accessories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_back` to the `Jackets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `Jackets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_back` to the `Pants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `Pants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_back` to the `Shirts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `Shirts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_back` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_back` to the `Sweatshirts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `Sweatshirts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_back` to the `Tops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `Tops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accessories" DROP COLUMN "image_url",
ADD COLUMN     "image_back" TEXT NOT NULL,
ADD COLUMN     "image_front" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Jackets" DROP COLUMN "image_url",
ADD COLUMN     "image_back" TEXT NOT NULL,
ADD COLUMN     "image_front" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pants" DROP COLUMN "image_url",
ADD COLUMN     "image_back" TEXT NOT NULL,
ADD COLUMN     "image_front" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shirts" DROP COLUMN "image_url",
ADD COLUMN     "image_back" TEXT NOT NULL,
ADD COLUMN     "image_front" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shoes" DROP COLUMN "image_url",
ADD COLUMN     "image_back" TEXT NOT NULL,
ADD COLUMN     "image_front" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sweatshirts" DROP COLUMN "image_url",
ADD COLUMN     "image_back" TEXT NOT NULL,
ADD COLUMN     "image_front" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tops" DROP COLUMN "image_url",
ADD COLUMN     "image_back" TEXT NOT NULL,
ADD COLUMN     "image_front" TEXT NOT NULL;
