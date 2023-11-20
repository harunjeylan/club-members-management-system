/*
  Warnings:

  - You are about to drop the column `spaceId` on the `Setting` table. All the data in the column will be lost.
  - Added the required column `spaceName` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_spaceId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "spaceName" TEXT;

-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "spaceId",
ADD COLUMN     "spaceName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_spaceName_fkey" FOREIGN KEY ("spaceName") REFERENCES "Space"("name") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_spaceName_fkey" FOREIGN KEY ("spaceName") REFERENCES "Space"("name") ON DELETE SET NULL ON UPDATE NO ACTION;
