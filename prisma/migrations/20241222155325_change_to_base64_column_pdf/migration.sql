/*
  Warnings:

  - You are about to drop the column `pdf` on the `fiscal_nfse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fiscal_nfse` DROP COLUMN `pdf`,
    ADD COLUMN `base64Pdf` LONGTEXT NULL;
