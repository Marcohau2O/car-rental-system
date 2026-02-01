/*
  Warnings:

  - You are about to drop the column `fin` on the `Reservacion` table. All the data in the column will be lost.
  - You are about to drop the column `inicio` on the `Reservacion` table. All the data in the column will be lost.
  - Added the required column `fechafin` to the `Reservacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechainicio` to the `Reservacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seguro` to the `Reservacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sillabebe` to the `Reservacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservacion" DROP COLUMN "fin",
DROP COLUMN "inicio",
ADD COLUMN     "fechafin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechainicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "seguro" BOOLEAN NOT NULL,
ADD COLUMN     "sillabebe" BOOLEAN NOT NULL;
