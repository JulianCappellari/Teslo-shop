/*
  Warnings:

  - Added the required column `cuidad` to the `DireccionUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DireccionUsuario" ADD COLUMN     "cuidad" TEXT NOT NULL;
