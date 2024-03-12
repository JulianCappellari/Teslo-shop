-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerificado" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'user',
    "imagen" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
