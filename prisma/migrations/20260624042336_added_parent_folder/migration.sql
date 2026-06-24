/*
  Warnings:

  - Added the required column `parentFolder` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "parentFolder" TEXT NOT NULL;
