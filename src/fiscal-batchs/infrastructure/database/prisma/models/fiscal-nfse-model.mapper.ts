import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Prisma, FiscalNfse } from '@prisma/client';
import {
  FiscalNfseEntity,
  FiscalNfseProps,
} from '@/fiscal-batchs/domain/entities/fiscal-nfse.entity';

export class FiscalNfseModelMapper {
  static toEntity(model: FiscalNfse): FiscalNfseEntity {
    const data: FiscalNfseProps = {
      number: model.number,
      verificationCode: model.verification_code,
      issueDate: model.issue_date,
      rpsNumber: model.rps_number ?? '',
      rpsIssueDate: model.rps_issue_date,
      competence: model.competence,
      providerId: model.provider_id ?? undefined,
      takerId: model.taker_id,
      rpsId: model.rps_id,
      sentAt: model.sent_at ?? undefined,
      createdAt: model.created_at,
    };

    try {
      return new FiscalNfseEntity(data, model.id);
    } catch (error) {
      throw new ValidationError('An entity could not be loaded');
    }
  }

  static toPrisma(entity: FiscalNfseEntity): Prisma.FiscalNfseCreateInput {
    return {
      id: entity.id,
      number: entity.number,
      verification_code: entity.verificationCode,
      issue_date: entity.issueDate,
      rps_number: entity.rpsNumber,
      rps_issue_date: entity.rpsIssueDate,
      competence: entity.competence,
      provider: { connect: { id: entity.providerId } },
      taker: { connect: { id: entity.takerId } },
      rps: { connect: { id: entity.rpsId } },
      sent_at: entity.sentAt ?? null,
      created_at: entity.createdAt,
    };
  }
}
