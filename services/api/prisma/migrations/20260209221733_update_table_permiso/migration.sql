/*
  Warnings:

  - You are about to drop the column `rolId` on the `Permiso` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permiso" DROP CONSTRAINT "Permiso_rolId_fkey";

-- AlterTable
ALTER TABLE "Permiso" DROP COLUMN "rolId";

-- CreateTable
CREATE TABLE "RolPermiso" (
    "id" SERIAL NOT NULL,
    "rolId" INTEGER NOT NULL,
    "permisoId" INTEGER NOT NULL,

    CONSTRAINT "RolPermiso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RolPermiso_rolId_permisoId_key" ON "RolPermiso"("rolId", "permisoId");

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "Permiso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
