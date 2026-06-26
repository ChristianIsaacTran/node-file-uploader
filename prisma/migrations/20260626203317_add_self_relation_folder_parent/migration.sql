/*
  Warnings:

  - You are about to drop the column `parentFolder` on the `Folders` table. All the data in the column will be lost.
  - Added the required column `parentFolderId` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folders" DROP COLUMN "parentFolder",
ADD COLUMN     "parentFolderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
