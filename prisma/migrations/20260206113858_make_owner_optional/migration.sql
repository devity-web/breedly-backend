-- DropForeignKey
ALTER TABLE "Dog" DROP CONSTRAINT "Dog_ownerId_fkey";

-- AlterTable
ALTER TABLE "Dog" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
