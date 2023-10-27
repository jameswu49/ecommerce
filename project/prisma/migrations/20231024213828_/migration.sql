-- CreateTable
CREATE TABLE "GuestUser" (
    "id" SERIAL NOT NULL,
    "guestId" TEXT NOT NULL,
    "guestCartId" INTEGER NOT NULL,

    CONSTRAINT "GuestUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestCart" (
    "id" SERIAL NOT NULL,
    "guestUserId" INTEGER NOT NULL,

    CONSTRAINT "GuestCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestCartItem" (
    "id" SERIAL NOT NULL,
    "guestCartId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "productImage" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "GuestCartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestUser_guestId_key" ON "GuestUser"("guestId");

-- AddForeignKey
ALTER TABLE "GuestUser" ADD CONSTRAINT "GuestUser_guestCartId_fkey" FOREIGN KEY ("guestCartId") REFERENCES "GuestCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestCartItem" ADD CONSTRAINT "GuestCartItem_guestCartId_fkey" FOREIGN KEY ("guestCartId") REFERENCES "GuestCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
