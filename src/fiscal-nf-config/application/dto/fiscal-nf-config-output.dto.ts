import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';

export type FiscalNfConfigOutputDto = {
  id: string;
  serie: string;
  nextDocumentNumber: number;
  simpleNational?: boolean;
  taxationRegime: string;
  operationNature?: string;
  culturalIncentive?: boolean;
  fiscalIncentive?: boolean;
  emitterId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class FiscalNfConfigOutputMapper {
  static toOutput(entity: FiscalNfConfigEntity): FiscalNfConfigOutputDto {
    return {
      id: entity.id,
      serie: entity.serie,
      nextDocumentNumber: entity.nextDocumentNumber,
      simpleNational: entity.simpleNational,
      taxationRegime: entity.taxationRegime,
      operationNature: entity.operationNature,
      culturalIncentive: entity.culturalIncentive,
      fiscalIncentive: entity.fiscalIncentive,
      emitterId: entity.emitterId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
