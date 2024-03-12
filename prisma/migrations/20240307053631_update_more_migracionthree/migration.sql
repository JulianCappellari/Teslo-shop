-- CreateTable
CREATE TABLE "Orden" (
    "id" TEXT NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "impuesto" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "itemsEnLaOrden" INTEGER NOT NULL,
    "estaPagada" BOOLEAN NOT NULL,
    "entregada" BOOLEAN NOT NULL,
    "pagadoEl" TIMESTAMP(3),
    "creadoEl" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEl" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Orden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemsDeLaOrden" (
    "id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "talle" "Talle" NOT NULL,
    "ordenId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "itemsDeLaOrden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direccionDeLaOrden" (
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

    CONSTRAINT "direccionDeLaOrden_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "direccionDeLaOrden_ordenId_key" ON "direccionDeLaOrden"("ordenId");

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsDeLaOrden" ADD CONSTRAINT "itemsDeLaOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsDeLaOrden" ADD CONSTRAINT "itemsDeLaOrden_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direccionDeLaOrden" ADD CONSTRAINT "direccionDeLaOrden_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direccionDeLaOrden" ADD CONSTRAINT "direccionDeLaOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
