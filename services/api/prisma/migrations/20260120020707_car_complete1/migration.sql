/*
  Warnings:

  - Changed the type of `cantidadpuerta` on the `Auto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `capacidad` on the `Auto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Auto" DROP COLUMN "cantidadpuerta",
ADD COLUMN     "cantidadpuerta" INTEGER NOT NULL,
DROP COLUMN "capacidad",
ADD COLUMN     "capacidad" INTEGER NOT NULL;
