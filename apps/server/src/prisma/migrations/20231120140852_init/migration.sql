/*
  Warnings:

  - Made the column `spaceId` on table `Setting` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_spaceId_fkey";

-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "spaceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
