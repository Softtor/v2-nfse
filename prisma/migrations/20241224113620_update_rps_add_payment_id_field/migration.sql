-- DropForeignKey
ALTER TABLE `fiscal_nfse` DROP FOREIGN KEY `fiscal_nfse_rps_id_fkey`;

-- AlterTable
ALTER TABLE `fiscal_rps` ADD COLUMN `payment_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `fiscal_nfse` ADD CONSTRAINT `fiscal_nfse_rps_id_fkey` FOREIGN KEY (`rps_id`) REFERENCES `fiscal_rps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
