import { FiscalNfConfig, Prisma, taxation_regime } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import {
  FiscalNfConfigEntity,
  FiscalNfConfigProps,
} from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';

export class FiscalNfConfigModelMapper {
  static toEntity(model: FiscalNfConfig): FiscalNfConfigEntity {
    const reverseEnumMap: Record<taxation_regime, string> = {
      [taxation_regime.MICROEMPRESA_MUNICIPAL]: '1',
      [taxation_regime.ESTIMATIVA]: '2',
      [taxation_regime.SOCIEDADE_DE_PROFISSIONAIS]: '3',
      [taxation_regime.COOPERATIVA]: '4',
      [taxation_regime.MEI]: '5',
      [taxation_regime.ME_EPP]: '6',
    };

    const data: FiscalNfConfigProps = {
      serie: model.serie,
      nextDocumentNumber: model.next_document_number,
      simpleNational: model.simple_national ?? undefined,
      taxationRegime: reverseEnumMap[model.taxation_regime],
      operationNature: model.operation_nature ?? undefined,
      culturalIncentive: model.cultural_incentive ?? undefined,
      fiscalIncentive: model.fiscal_incentive ?? undefined,
      emitterId: model.emitter_id,
      createdAt: model.created_at,
      updatedAt: model.updated_at,
    };

    try {
      return new FiscalNfConfigEntity(data, model.id);
    } catch (error) {
      throw new ValidationError('An entity could not be loaded');
    }
  }

  static toPrisma(
    entity: FiscalNfConfigEntity,
  ): Prisma.FiscalNfConfigCreateInput {
    const enumMap: Record<string, taxation_regime> = {
      '1': taxation_regime.MICROEMPRESA_MUNICIPAL,
      '2': taxation_regime.ESTIMATIVA,
      '3': taxation_regime.SOCIEDADE_DE_PROFISSIONAIS,
      '4': taxation_regime.COOPERATIVA,
      '5': taxation_regime.MEI,
      '6': taxation_regime.ME_EPP,
    };

    const taxationRegimeEnum = enumMap[entity.taxationRegime];

    if (!taxationRegimeEnum) {
      throw new ValidationError('Invalid taxation_regime enum value');
    }

    return {
      id: entity.id,
      serie: entity.serie,
      next_document_number: entity.nextDocumentNumber,
      simple_national: entity.simpleNational ?? null,
      taxation_regime: taxationRegimeEnum,
      operation_nature: entity.operationNature ?? null,
      cultural_incentive: entity.culturalIncentive ?? null,
      fiscal_incentive: entity.fiscalIncentive ?? null,
      emitter: {
        connect: {
          id: entity.emitterId,
        },
      },
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}
