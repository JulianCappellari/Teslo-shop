-- CreateTable
CREATE TABLE "DireccionUsuario" (
    "is" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "direccion2" TEXT,
    "codigoPostal" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "paisId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "DireccionUsuario_pkey" PRIMARY KEY ("is")
);

-- CreateIndex
CREATE UNIQUE INDEX "DireccionUsuario_usuarioId_key" ON "DireccionUsuario"("usuarioId");

-- AddForeignKey
ALTER TABLE "DireccionUsuario" ADD CONSTRAINT "DireccionUsuario_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DireccionUsuario" ADD CONSTRAINT "DireccionUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
