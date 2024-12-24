import { FiscalProviderEntity } from '@/fiscal-emitter/domain/entities/fiscal-provider.entity';

export type FiscalProviderOutputDto = {
  id: string;
  cnpj?: string;
  cpf?: string;
  municipalSubscription: string;
  emitterId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class FiscalProviderOutputMapper {
  static toOutput(entity: FiscalProviderEntity): FiscalProviderOutputDto {
    return {
      id: entity.id,
      cnpj: entity.cnpj,
      cpf: entity.cpf,
      municipalSubscription: entity.municipalSubscription,
      emitterId: entity.emitterId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
