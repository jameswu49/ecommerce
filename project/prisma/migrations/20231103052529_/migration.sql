/*
  Warnings:

  - You are about to drop the `GuestCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GuestCartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GuestUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GuestCartItem" DROP CONSTRAINT "GuestCartItem_guestCartId_fkey";

-- DropForeignKey
ALTER TABLE "GuestUser" DROP CONSTRAINT "GuestUser_guestCartId_fkey";

-- DropTable
DROP TABLE "GuestCart";

-- DropTable
DROP TABLE "GuestCartItem";

-- DropTable
DROP TABLE "GuestUser";
