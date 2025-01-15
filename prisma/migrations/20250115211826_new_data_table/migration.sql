/*
  Warnings:

  - You are about to drop the column `generatedcode` on the `Prompt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "generatedcode";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;
