import { FiscalNfse } from '@prisma/client';
import {
  FiscalNfseEntity,
  FiscalNfseProps,
} from '../../../../domain/entities/fiscal-nfse.entity';

export class NfseModelMapper {
  static toEntity(model: FiscalNfse): FiscalNfseEntity {
    const props: FiscalNfseProps = {
      number: model.number,
      rpsId: model.rps_id,
      issueDate: model.issue_date,
      verificationCode: model.verification_code,
      rpsNumber: model.rps_number,
      rpsIssueDate: model.rps_issue_date,
      competence: model.competence,
      sentAt: model.sent_at,
      createdAt: model.created_at,
      providerId: model.provider_id,
      takerId: model.taker_id,
    };
    return new FiscalNfseEntity(props, model.id);
  }

  static toModel(entity: FiscalNfseEntity): FiscalNfse {
    return {
      id: entity.id,
      number: entity.number,
      rps_id: entity.rpsId,
      issue_date: entity.issueDate,
      verification_code: entity.verificationCode,
      rps_number: entity.rpsNumber,
      rps_issue_date: entity.rpsIssueDate,
      competence: entity.competence,
      sent_at: entity.sentAt,
      created_at: entity.createdAt,
      provider_id: entity.providerId,
      taker_id: entity.takerId,
      xml: entity.xml,
      base64Pdf: entity.base64Pdf,
    };
  }
}
