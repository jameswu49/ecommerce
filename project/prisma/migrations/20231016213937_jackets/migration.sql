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
CREATE TABLE "JacketColors" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "colorImage" TEXT NOT NULL,
    "jacketId" INTEGER NOT NULL,

    CONSTRAINT "JacketColors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JacketImages" (
    "id" SERIAL NOT NULL,
    "image1" TEXT DEFAULT '',
    "image2" TEXT DEFAULT '',
    "image3" TEXT DEFAULT '',
    "image4" TEXT DEFAULT '',
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "JacketImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JacketColors" ADD CONSTRAINT "JacketColors_jacketId_fkey" FOREIGN KEY ("jacketId") REFERENCES "Jackets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketImages" ADD CONSTRAINT "JacketImages_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "JacketColors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
