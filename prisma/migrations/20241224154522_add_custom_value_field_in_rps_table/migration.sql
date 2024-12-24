-- AlterTable
ALTER TABLE `fiscal_nfse` MODIFY `xml` LONGTEXT NULL,
    MODIFY `base64Pdf` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `fiscal_rps` ADD COLUMN `custom_value` DOUBLE NULL;
