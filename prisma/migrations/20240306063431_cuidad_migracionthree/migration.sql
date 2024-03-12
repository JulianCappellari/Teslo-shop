/*
  Warnings:

  - You are about to drop the column `cuidad` on the `DireccionUsuario` table. All the data in the column will be lost.
  - Added the required column `ciudad` to the `DireccionUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DireccionUsuario" DROP COLUMN "cuidad",
ADD COLUMN     "ciudad" TEXT NOT NULL;
