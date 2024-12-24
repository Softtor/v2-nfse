/*
  Warnings:

  - You are about to drop the column `generating_organ` on the `fiscal_nfse` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `fiscal_nfse` table. All the data in the column will be lost.
  - You are about to drop the column `validation_url` on the `fiscal_nfse` table. All the data in the column will be lost.
  - You are about to drop the column `webservice_number` on the `fiscal_nfse` table. All the data in the column will be lost.
  - You are about to alter the column `rps_id` on the `fiscal_nfse` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `taker_id` on the `fiscal_nfse` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - Added the required column `competence` to the `fiscal_nfse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue_date` to the `fiscal_nfse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `fiscal_nfse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rps_issue_date` to the `fiscal_nfse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rps_number` to the `fiscal_nfse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verification_code` to the `fiscal_nfse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fiscal_nfse` DROP FOREIGN KEY `fiscal_nfse_rps_id_fkey`;

-- DropForeignKey
ALTER TABLE `fiscal_nfse` DROP FOREIGN KEY `fiscal_nfse_taker_id_fkey`;

-- AlterTable
ALTER TABLE `fiscal_nfse` DROP COLUMN `generating_organ`,
    DROP COLUMN `url`,
    DROP COLUMN `validation_url`,
    DROP COLUMN `webservice_number`,
    ADD COLUMN `competence` DATETIME(3) NOT NULL,
    ADD COLUMN `issue_date` DATETIME(3) NOT NULL,
    ADD COLUMN `number` VARCHAR(50) NOT NULL,
    ADD COLUMN `provider_id` VARCHAR(50) NULL,
    ADD COLUMN `rps_issue_date` DATETIME(3) NOT NULL,
    ADD COLUMN `rps_number` VARCHAR(50) NOT NULL,
    ADD COLUMN `verification_code` VARCHAR(50) NOT NULL,
    MODIFY `rps_id` VARCHAR(50) NOT NULL,
    MODIFY `taker_id` VARCHAR(50) NULL;

-- AddForeignKey
ALTER TABLE `fiscal_nfse` ADD CONSTRAINT `fiscal_nfse_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `fiscal_providers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_nfse` ADD CONSTRAINT `fiscal_nfse_taker_id_fkey` FOREIGN KEY (`taker_id`) REFERENCES `fiscal_takers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_nfse` ADD CONSTRAINT `fiscal_nfse_rps_id_fkey` FOREIGN KEY (`rps_id`) REFERENCES `fiscal_rps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
