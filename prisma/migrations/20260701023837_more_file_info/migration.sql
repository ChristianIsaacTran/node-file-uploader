/*
  Warnings:

  - Added the required column `fileByteName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileLocalDest` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileByteName" TEXT NOT NULL,
ADD COLUMN     "fileLocalDest" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL;
