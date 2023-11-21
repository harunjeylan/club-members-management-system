/*
  Warnings:

  - You are about to drop the column `image` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "fileModelId" TEXT,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "image",
ADD COLUMN     "fileModelId" TEXT;

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "fileModelId" TEXT;

-- CreateTable
CREATE TABLE "FileModel" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FileModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_fileModelId_fkey" FOREIGN KEY ("fileModelId") REFERENCES "FileModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_fileModelId_fkey" FOREIGN KEY ("fileModelId") REFERENCES "FileModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_fileModelId_fkey" FOREIGN KEY ("fileModelId") REFERENCES "FileModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
