-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_replyId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "replyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
