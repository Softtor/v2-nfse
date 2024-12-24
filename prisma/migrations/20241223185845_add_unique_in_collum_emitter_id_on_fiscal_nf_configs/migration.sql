/*
  Warnings:

  - A unique constraint covering the columns `[emitter_id]` on the table `fiscal_nf_configs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fiscal_nf_configs_emitter_id_key` ON `fiscal_nf_configs`(`emitter_id`);
