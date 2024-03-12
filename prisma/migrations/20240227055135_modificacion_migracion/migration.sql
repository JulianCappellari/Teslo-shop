/*
  Warnings:

  - The values [XXXX] on the enum `Talle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Talle_new" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');
ALTER TABLE "Producto" ALTER COLUMN "talles" DROP DEFAULT;
ALTER TABLE "Producto" ALTER COLUMN "talles" TYPE "Talle_new"[] USING ("talles"::text::"Talle_new"[]);
ALTER TYPE "Talle" RENAME TO "Talle_old";
ALTER TYPE "Talle_new" RENAME TO "Talle";
DROP TYPE "Talle_old";
ALTER TABLE "Producto" ALTER COLUMN "talles" SET DEFAULT ARRAY[]::"Talle"[];
COMMIT;
