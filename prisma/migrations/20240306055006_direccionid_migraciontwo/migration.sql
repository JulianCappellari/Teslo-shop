/*
  Warnings:

  - The primary key for the `DireccionUsuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is` on the `DireccionUsuario` table. All the data in the column will be lost.
  - The required column `id` was added to the `DireccionUsuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "DireccionUsuario" DROP CONSTRAINT "DireccionUsuario_pkey",
DROP COLUMN "is",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DireccionUsuario_pkey" PRIMARY KEY ("id");
