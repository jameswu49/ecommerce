-- CreateTable
CREATE TABLE "Jackets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mainImage" TEXT DEFAULT '',

    CONSTRAINT "Jackets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shirts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mainImage" TEXT DEFAULT '',

    CONSTRAINT "Shirts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tops" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mainImage" TEXT DEFAULT '',

    CONSTRAINT "Tops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SweatShirts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mainImage" TEXT DEFAULT '',

    CONSTRAINT "SweatShirts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mainImage" TEXT DEFAULT '',

    CONSTRAINT "Pants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mainImage" TEXT DEFAULT '',

    CONSTRAINT "Accessories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shoes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mainImage" TEXT DEFAULT '',

    CONSTRAINT "Shoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "colorImage" TEXT NOT NULL,
    "jacketId" INTEGER,
    "shirtId" INTEGER,
    "topsId" INTEGER,
    "sweatshirtsId" INTEGER,
    "pantsId" INTEGER,
    "accessoriesId" INTEGER,
    "shoesId" INTEGER,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "image1" TEXT DEFAULT '',
    "image2" TEXT DEFAULT '',
    "image3" TEXT DEFAULT '',
    "image4" TEXT DEFAULT '',
    "jacketId" INTEGER,
    "shirtId" INTEGER,
    "topsId" INTEGER,
    "sweatShirtsId" INTEGER,
    "pantsId" INTEGER,
    "accessoriesId" INTEGER,
    "shoesId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "productImage" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_jacketId_fkey" FOREIGN KEY ("jacketId") REFERENCES "Jackets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_shirtId_fkey" FOREIGN KEY ("shirtId") REFERENCES "Shirts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_topsId_fkey" FOREIGN KEY ("topsId") REFERENCES "Tops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_sweatshirtsId_fkey" FOREIGN KEY ("sweatshirtsId") REFERENCES "SweatShirts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_pantsId_fkey" FOREIGN KEY ("pantsId") REFERENCES "Pants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_accessoriesId_fkey" FOREIGN KEY ("accessoriesId") REFERENCES "Accessories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_shoesId_fkey" FOREIGN KEY ("shoesId") REFERENCES "Shoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_jacketId_fkey" FOREIGN KEY ("jacketId") REFERENCES "Jackets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_shirtId_fkey" FOREIGN KEY ("shirtId") REFERENCES "Shirts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_topsId_fkey" FOREIGN KEY ("topsId") REFERENCES "Tops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_sweatShirtsId_fkey" FOREIGN KEY ("sweatShirtsId") REFERENCES "SweatShirts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_pantsId_fkey" FOREIGN KEY ("pantsId") REFERENCES "Pants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_accessoriesId_fkey" FOREIGN KEY ("accessoriesId") REFERENCES "Accessories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_shoesId_fkey" FOREIGN KEY ("shoesId") REFERENCES "Shoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
