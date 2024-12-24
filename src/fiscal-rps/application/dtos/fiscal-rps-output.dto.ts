import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';

export type FiscalRpsOutputDto = {
  id: string;
  number: number;
  series: string;
  issueDateRps?: Date;
  type: string;
  status: string;
  competence?: Date;
  complementaryInformation?: string;
  serviceId: string;
  takerId: string;
  providerId: string;
  batchId?: string;
  customValue?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class FiscalRpsOutputMapper {
  static toOutput(entity: FiscalRpsEntity): FiscalRpsOutputDto {
    return {
      id: entity.id,
      number: entity.number,
      series: entity.series,
      issueDateRps: entity.issueDateRps,
      type: entity.type,
      status: entity.status,
      competence: entity.competence,
      complementaryInformation: entity.complementaryInformation,
      serviceId: entity.serviceId,
      takerId: entity.takerId,
      providerId: entity.providerId,
      batchId: entity.batchId,
      customValue: entity.customValue,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
