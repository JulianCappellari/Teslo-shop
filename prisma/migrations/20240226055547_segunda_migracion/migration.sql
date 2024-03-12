-- CreateTable
CREATE TABLE "ImagenProducto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "ImagenProducto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagenProducto" ADD CONSTRAINT "ImagenProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
