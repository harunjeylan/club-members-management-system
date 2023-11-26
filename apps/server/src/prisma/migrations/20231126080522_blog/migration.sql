/*
  Warnings:

  - Made the column `published` on table `Blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedAt` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "published" SET NOT NULL,
ALTER COLUMN "publishedAt" SET NOT NULL;
