/*
  Warnings:

  - Added the required column `scop` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ForumScop" AS ENUM ('GENERAL', 'LOCAL');

-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_spaceName_fkey";

-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "scop" "ForumScop" NOT NULL,
ALTER COLUMN "spaceName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_spaceName_fkey" FOREIGN KEY ("spaceName") REFERENCES "Space"("name") ON DELETE SET NULL ON UPDATE NO ACTION;
