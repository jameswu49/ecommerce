/*
  Warnings:

  - Added the required column `description` to the `Accessories` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Accessories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Accessories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Jackets` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Jackets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Jackets` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Pants` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Pants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Pants` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Shirts` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Shirts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Shirts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Shoes` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Shoes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Shoes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Sweatshirts` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Sweatshirts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Sweatshirts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Tops` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Tops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Tops` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE accessories_id_seq;
ALTER TABLE "Accessories" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('accessories_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE accessories_id_seq OWNED BY "Accessories"."id";

-- AlterTable
CREATE SEQUENCE jackets_id_seq;
ALTER TABLE "Jackets" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('jackets_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE jackets_id_seq OWNED BY "Jackets"."id";

-- AlterTable
CREATE SEQUENCE pants_id_seq;
ALTER TABLE "Pants" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('pants_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE pants_id_seq OWNED BY "Pants"."id";

-- AlterTable
CREATE SEQUENCE shirts_id_seq;
ALTER TABLE "Shirts" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('shirts_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE shirts_id_seq OWNED BY "Shirts"."id";

-- AlterTable
CREATE SEQUENCE shoes_id_seq;
ALTER TABLE "Shoes" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('shoes_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE shoes_id_seq OWNED BY "Shoes"."id";

-- AlterTable
CREATE SEQUENCE sweatshirts_id_seq;
ALTER TABLE "Sweatshirts" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('sweatshirts_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE sweatshirts_id_seq OWNED BY "Sweatshirts"."id";

-- AlterTable
CREATE SEQUENCE tops_id_seq;
ALTER TABLE "Tops" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('tops_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE tops_id_seq OWNED BY "Tops"."id";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
