-- CreateTable
CREATE TABLE "Folders" (
    "id" SERIAL NOT NULL,
    "folderRoute" TEXT NOT NULL,
    "folderUserId" INTEGER NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_folderUserId_fkey" FOREIGN KEY ("folderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
