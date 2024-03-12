-- CreateEnum
CREATE TYPE "Talle" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXX');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('hombre', 'mujeres', 'kid', 'unisex');

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "enStock" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "talles" "Talle"[] DEFAULT ARRAY[]::"Talle"[],
    "slug" TEXT NOT NULL,
    "etiquetas" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "titulo" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "categoriaId" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_slug_key" ON "Producto"("slug");

-- CreateIndex
CREATE INDEX "Producto_genero_idx" ON "Producto"("genero");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
