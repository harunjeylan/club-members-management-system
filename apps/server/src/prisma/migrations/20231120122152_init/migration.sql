/*
  Warnings:

  - A unique constraint covering the columns `[name,code,scop,spaceId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Role_name_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_code_scop_spaceId_key" ON "Role"("name", "code", "scop", "spaceId");
