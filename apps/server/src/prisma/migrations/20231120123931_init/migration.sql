/*
  Warnings:

  - You are about to drop the column `spaceId` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,code,scop,spaceName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "RoleCode" ADD VALUE 'EDITOR';

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_spaceId_fkey";

-- DropIndex
DROP INDEX "Role_name_code_scop_spaceId_key";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "spaceId",
ADD COLUMN     "spaceName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_code_scop_spaceName_key" ON "Role"("name", "code", "scop", "spaceName");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_spaceName_fkey" FOREIGN KEY ("spaceName") REFERENCES "Space"("name") ON DELETE CASCADE ON UPDATE NO ACTION;
