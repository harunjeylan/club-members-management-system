/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `FileModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileModel_name_key" ON "FileModel"("name");
