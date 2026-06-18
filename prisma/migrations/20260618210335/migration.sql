/*
  Warnings:

  - A unique constraint covering the columns `[folderName]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileFolderId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileLocation` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folderName` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileFolderId" INTEGER NOT NULL,
ADD COLUMN     "fileLocation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "folderName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folders_folderName_key" ON "Folders"("folderName");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileFolderId_fkey" FOREIGN KEY ("fileFolderId") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
