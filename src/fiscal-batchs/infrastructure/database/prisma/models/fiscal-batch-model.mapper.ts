import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Prisma, FiscalBatchNfse } from '@prisma/client';
import {
  FiscalBatchNfseEntity,
  FiscalBatchNfseProps,
} from '@/fiscal-batchs/domain/entities/fiscal-bach.entity';

export class FiscalBatchNfseModelMapper {
  static toEntity(model: FiscalBatchNfse): FiscalBatchNfseEntity {
    const data: FiscalBatchNfseProps = {
      name: model.name.toString(),
      sentAt: model.sent_at ?? undefined,
      providerId: model.provider_id,
      receiptDate: model.receipt_date ?? undefined,
      protocol: model.protocol ?? undefined,
      batchNumber: model.batch_number ?? undefined,
      confirmedSentWs: model.confirmed_send_ws ?? undefined,
      createdAt: model.created_at,
    };

    try {
      return new FiscalBatchNfseEntity(data, model.id);
    } catch (error) {
      throw new ValidationError('An entity could not be loaded');
    }
  }

  static toCreatePrismaInput(
    entity: FiscalBatchNfseEntity,
  ): Prisma.FiscalBatchNfseCreateInput {
    return {
      id: entity.id,
      sent_at: entity.sentAt ?? null,
      provider: { connect: { id: entity.providerId } },
      protocol: entity.protocol ?? null,
      receipt_date: entity.receiptDate ?? null,
      batch_number: entity.batchNumber ?? null,
      confirmed_send_ws: entity.confirmedSentWs ?? null,
      created_at: entity.createdAt,
    };
  }

  static toUpdatePrismaInput(
    entity: FiscalBatchNfseEntity,
  ): Prisma.FiscalBatchNfseUpdateInput {
    return {
      sent_at: entity.sentAt ?? null,
      provider: { connect: { id: entity.providerId } },
      protocol: entity.protocol ?? null,
      receipt_date: entity.receiptDate ?? null,
      batch_number: entity.batchNumber ?? null,
      confirmed_send_ws: entity.confirmedSentWs ?? null,
    };
  }
}
