import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Prisma, FiscalRps, $Enums } from '@prisma/client';
import {
  FiscalRpsEntity,
  FiscalRpsProps,
} from '@/fiscal-rps/domain/entities/fiscal-rps.entity';

export class FiscalRpsModelMapper {
  // Mapeamento reverso para transformar os valores do enum em strings
  static reverseEnumMapType: Record<$Enums.nf_type, string> = {
    [$Enums.nf_type.RPS]: '1',
    [$Enums.nf_type.NF_CONJUGADA]: '2',
    [$Enums.nf_type.CUPOM]: '3',
  };

  static reverseEnumMapStatus: Record<$Enums.nf_status, string> = {
    [$Enums.nf_status.NORMAL]: '1',
    [$Enums.nf_status.CANCELADO]: '2',
  };

  // Mapeamento direto para transformar strings nos valores do enum Prisma
  static enumMapType: Record<string, $Enums.nf_type> = {
    '1': $Enums.nf_type.RPS,
    '2': $Enums.nf_type.NF_CONJUGADA,
    '3': $Enums.nf_type.CUPOM,
  };

  static enumMapStatus: Record<string, $Enums.nf_status> = {
    '1': $Enums.nf_status.NORMAL,
    '2': $Enums.nf_status.CANCELADO,
  };

  static toEntity(model: FiscalRps): FiscalRpsEntity {
    const data: FiscalRpsProps = {
      number: model.number,
      series: model.series,
      issueDateRps: model.issue_date_rps ?? undefined,
      type: FiscalRpsModelMapper.reverseEnumMapType[model.type],
      status: FiscalRpsModelMapper.reverseEnumMapStatus[model.status],
      competence: model.competence ?? undefined,
      complementaryInformation: model.complementary_information ?? undefined,
      serviceId: model.service_id,
      takerId: model.taker_id,
      providerId: model.provider_id ?? undefined,
      batchId: model.batch_id ?? undefined,
      paymentId: model.payment_id ?? undefined,
      customValue: model.custom_value ?? undefined,
      createdAt: model.created_at,
      updatedAt: model.updated_at,
    };

    try {
      return new FiscalRpsEntity(data, model.id);
    } catch (error) {
      throw new ValidationError('An entity could not be loaded');
    }
  }
  static toPrisma(entity: FiscalRpsEntity): Prisma.FiscalRpsCreateInput {
    const typeEnum = this.enumMapType[entity.type];
    const statusEnum = this.enumMapStatus[entity.status];

    if (!typeEnum) {
      throw new ValidationError(`Invalid nf_type enum value: ${entity.type}`);
    }
    if (!statusEnum) {
      throw new ValidationError(
        `Invalid nf_status enum value: ${entity.status}`,
      );
    }

    const data: Prisma.FiscalRpsCreateInput = {
      id: entity.id,
      number: entity.number,
      series: entity.series,
      issue_date_rps: entity.issueDateRps ?? null,
      type: typeEnum,
      status: statusEnum,
      payment_id: entity.paymentId ?? null,
      competence: entity.competence ?? null,
      complementary_information: entity.complementaryInformation ?? null,
      service: { connect: { id: entity.serviceId } },
      taker: { connect: { id: entity.takerId } },
      provider: { connect: { id: entity.providerId } },
      custom_value: entity.customValue ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };

    if (entity.batchId) {
      data.batch = { connect: { id: entity.batchId } };
    }

    return data;
  }
}
