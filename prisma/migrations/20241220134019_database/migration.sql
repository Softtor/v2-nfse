-- CreateTable
CREATE TABLE `fiscal_rps` (
    `id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `series` VARCHAR(5) NOT NULL,
    `issue_date_rps` DATETIME(3) NULL,
    `type` ENUM('1', '2', '3') NOT NULL,
    `status` ENUM('1', '2') NOT NULL,
    `competence` DATE NULL,
    `complementary_information` VARCHAR(191) NULL,
    `service_id` VARCHAR(191) NOT NULL,
    `taker_id` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NULL,
    `batch_id` VARCHAR(191) NULL,
    `service_description` VARCHAR(191) NULL,
    `cnae_code` INTEGER NULL,
    `activity_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal_nfse` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `validation_url` VARCHAR(255) NULL,
    `webservice_number` INTEGER NULL,
    `generating_organ` VARCHAR(10) NULL,
    `rps_id` VARCHAR(191) NOT NULL,
    `taker_id` VARCHAR(191) NOT NULL,
    `sent_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal_services` (
    `id` VARCHAR(191) NOT NULL,
    `service_value` DOUBLE NOT NULL,
    `deduction_value` DOUBLE NOT NULL,
    `pis_value` DOUBLE NOT NULL,
    `cofins_value` DOUBLE NULL,
    `inss_value` DOUBLE NULL,
    `ir_value` DOUBLE NULL,
    `csll_value` DOUBLE NULL,
    `other_retentions` DOUBLE NULL,
    `total_tributes_value` DOUBLE NULL,
    `iss_value` DOUBLE NULL,
    `rate` DOUBLE NULL,
    `nbs_code` VARCHAR(191) NULL,
    `unconditional_discount` DOUBLE NOT NULL,
    `conditional_discount` DOUBLE NOT NULL,
    `iss_withheld` INTEGER NOT NULL,
    `service_item_list` VARCHAR(191) NOT NULL,
    `cnae_code` VARCHAR(191) NOT NULL,
    `municipal_taxation_code` VARCHAR(191) NOT NULL,
    `service_description` VARCHAR(191) NOT NULL,
    `municipality_code` VARCHAR(191) NOT NULL,
    `iss_exigibility` INTEGER NOT NULL,
    `incidence_municipality` VARCHAR(191) NOT NULL,
    `external_plan_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal_takers` (
    `id` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `city_code` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zip_code` VARCHAR(191) NOT NULL,
    `is_foreign` BOOLEAN NOT NULL DEFAULT false,
    `country_code` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal_providers` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NULL,
    `municipal_subscription` VARCHAR(191) NULL,
    `emitter_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fiscal_providers_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal_batchs_rps` (
    `id` VARCHAR(191) NOT NULL,
    `name` INTEGER NOT NULL AUTO_INCREMENT,
    `sent_at` DATETIME(3) NULL,
    `protocol` VARCHAR(191) NULL,
    `receipt_date` DATETIME(3) NULL,
    `batch_number` VARCHAR(191) NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `confirmed_send_ws` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `fiscal_batchs_rps_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal_emitters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `neighborhood` VARCHAR(191) NULL,
    `municipality_code` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `postal_code` VARCHAR(191) NULL,
    `crt` VARCHAR(191) NULL,
    `ie` VARCHAR(191) NULL,
    `im` VARCHAR(191) NULL,
    `cnae_code` VARCHAR(191) NULL,
    `activity_code` VARCHAR(191) NULL,
    `aliquot` DOUBLE NULL,
    `iss` DOUBLE NULL,
    `cofins` DOUBLE NULL,
    `csll` DOUBLE NULL,
    `inss` DOUBLE NULL,
    `ir` DOUBLE NULL,
    `pis` DOUBLE NULL,
    `iss_withheld` INTEGER NULL,
    `service_item_list` VARCHAR(191) NULL,
    `municipal_taxation_code` VARCHAR(191) NULL,
    `iss_eligibility` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fiscal_emitters_document_key`(`document`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscal_nf_configs` (
    `id` VARCHAR(191) NOT NULL,
    `serie` VARCHAR(191) NOT NULL,
    `next_document_number` INTEGER NOT NULL,
    `simple_national` BOOLEAN NULL DEFAULT false,
    `taxation_regime` ENUM('1', '2', '3', '4', '5', '6') NOT NULL,
    `operation_nature` VARCHAR(191) NULL,
    `cultural_incentive` BOOLEAN NULL DEFAULT false,
    `fiscal_incentive` BOOLEAN NULL DEFAULT false,
    `emitter_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fiscal_rps` ADD CONSTRAINT `fiscal_rps_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `fiscal_services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_rps` ADD CONSTRAINT `fiscal_rps_taker_id_fkey` FOREIGN KEY (`taker_id`) REFERENCES `fiscal_takers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_rps` ADD CONSTRAINT `fiscal_rps_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `fiscal_providers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_rps` ADD CONSTRAINT `fiscal_rps_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `fiscal_batchs_rps`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_nfse` ADD CONSTRAINT `fiscal_nfse_rps_id_fkey` FOREIGN KEY (`rps_id`) REFERENCES `fiscal_rps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_nfse` ADD CONSTRAINT `fiscal_nfse_taker_id_fkey` FOREIGN KEY (`taker_id`) REFERENCES `fiscal_takers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_providers` ADD CONSTRAINT `fiscal_providers_emitter_id_fkey` FOREIGN KEY (`emitter_id`) REFERENCES `fiscal_emitters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_batchs_rps` ADD CONSTRAINT `fiscal_batchs_rps_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `fiscal_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fiscal_nf_configs` ADD CONSTRAINT `fiscal_nf_configs_emitter_id_fkey` FOREIGN KEY (`emitter_id`) REFERENCES `fiscal_emitters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
