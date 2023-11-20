/*
  Warnings:

  - The values [SYSTEM] on the enum `RoleScop` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleScop_new" AS ENUM ('SUPER', 'SPACE');
ALTER TABLE "Role" ALTER COLUMN "scop" TYPE "RoleScop_new" USING ("scop"::text::"RoleScop_new");
ALTER TYPE "RoleScop" RENAME TO "RoleScop_old";
ALTER TYPE "RoleScop_new" RENAME TO "RoleScop";
DROP TYPE "RoleScop_old";
COMMIT;
