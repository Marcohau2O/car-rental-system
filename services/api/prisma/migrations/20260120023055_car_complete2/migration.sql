/*
  Warnings:

  - Added the required column `imagen` to the `Auto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auto" ADD COLUMN     "imagen" TEXT NOT NULL;
