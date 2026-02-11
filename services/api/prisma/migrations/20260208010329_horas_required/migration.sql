/*
  Warnings:

  - Made the column `horafin` on table `Reservacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `horainicio` on table `Reservacion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reservacion" ALTER COLUMN "horafin" SET NOT NULL,
ALTER COLUMN "horainicio" SET NOT NULL;
