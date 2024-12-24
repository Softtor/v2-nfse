import { FiscalNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-nfse.entity';

export type FiscalNfseOutputDto = {
  id: string;
  number: number;
  verificationCode: string;
  issueDate: Date;
  rpsNumber: string;
  rpsIssueDate: Date;
  competence: Date;
  providerId?: string;
  takerId: string;
  rpsId: string;
  sentAt?: Date;
  createdAt: Date;
};

export class FiscalNfseOutputMapper {
  static toOutput(entity: FiscalNfseEntity): FiscalNfseOutputDto {
    return {
      id: entity.id.toString(),
      number: entity.number,
      verificationCode: entity.verificationCode,
      issueDate: entity.issueDate,
      rpsNumber: entity.rpsNumber,
      rpsIssueDate: entity.rpsIssueDate,
      competence: entity.competence,
      providerId: entity.providerId,
      takerId: entity.takerId,
      rpsId: entity.rpsId,
      sentAt: entity.sentAt,
      createdAt: entity.createdAt,
    };
  }
}
