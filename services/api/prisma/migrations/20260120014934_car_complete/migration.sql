/*
  Warnings:

  - Added the required column `cantidadpuerta` to the `Auto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacidad` to the `Auto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kilometraje` to the `Auto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auto" ADD COLUMN     "cantidadpuerta" TEXT NOT NULL,
ADD COLUMN     "capacidad" TEXT NOT NULL,
ADD COLUMN     "kilometraje" TEXT NOT NULL;
