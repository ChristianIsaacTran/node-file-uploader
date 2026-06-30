/*
  Warnings:

  - A unique constraint covering the columns `[parentFolderId]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Folders_parentFolderId_key" ON "Folders"("parentFolderId");
