/*
  Warnings:

  - You are about to drop the `direccionDeLaOrden` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itemsDeLaOrden` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "direccionDeLaOrden" DROP CONSTRAINT "direccionDeLaOrden_ordenId_fkey";

-- DropForeignKey
ALTER TABLE "direccionDeLaOrden" DROP CONSTRAINT "direccionDeLaOrden_paisId_fkey";

-- DropForeignKey
ALTER TABLE "itemsDeLaOrden" DROP CONSTRAINT "itemsDeLaOrden_ordenId_fkey";

-- DropForeignKey
ALTER TABLE "itemsDeLaOrden" DROP CONSTRAINT "itemsDeLaOrden_productoId_fkey";

-- DropTable
DROP TABLE "direccionDeLaOrden";

-- DropTable
DROP TABLE "itemsDeLaOrden";

-- CreateTable
CREATE TABLE "ItemsDeLaOrden" (
    "id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "talle" "Talle" NOT NULL,
    "ordenId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "ItemsDeLaOrden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DireccionDeLaOrden" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "direccion2" TEXT,
    "codigoPostal" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "paisId" TEXT NOT NULL,
    "ordenId" TEXT NOT NULL,

    CONSTRAINT "DireccionDeLaOrden_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DireccionDeLaOrden_ordenId_key" ON "DireccionDeLaOrden"("ordenId");

-- AddForeignKey
ALTER TABLE "ItemsDeLaOrden" ADD CONSTRAINT "ItemsDeLaOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsDeLaOrden" ADD CONSTRAINT "ItemsDeLaOrden_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DireccionDeLaOrden" ADD CONSTRAINT "DireccionDeLaOrden_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DireccionDeLaOrden" ADD CONSTRAINT "DireccionDeLaOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
