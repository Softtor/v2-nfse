/*
  Warnings:

  - You are about to alter the column `number` on the `fiscal_nfse` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - A unique constraint covering the columns `[number]` on the table `fiscal_nfse` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `fiscal_nfse` MODIFY `number` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `fiscal_nfse_number_key` ON `fiscal_nfse`(`number`);
