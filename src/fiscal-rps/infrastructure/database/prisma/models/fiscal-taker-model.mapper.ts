import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Prisma, FiscalTaker } from '@prisma/client';
import {
  FiscalTakerEntity,
  FiscalTakerProps,
} from '@/fiscal-rps/domain/entities/fiscal-taker.entity';

export class FiscalTakerModelMapper {
  static toEntity(model: FiscalTaker): FiscalTakerEntity {
    const data: FiscalTakerProps = {
      document: model.document,
      name: model.name,
      address: model.address,
      number: model.number,
      complement: model.complement ?? undefined,
      neighborhood: model.neighborhood,
      cityCode: model.city_code,
      state: model.state,
      zipCode: model.zip_code,
      isForeign: model.is_foreign,
      countryCode: model.country_code ?? undefined,
      phone: model.phone ?? undefined,
      email: model.email ?? undefined,
      createdAt: model.created_at,
      updatedAt: model.updated_at,
    };

    try {
      return new FiscalTakerEntity(data, model.id);
    } catch (error) {
      throw new ValidationError('An entity could not be loaded');
    }
  }

  static toPrisma(entity: FiscalTakerEntity): Prisma.FiscalTakerCreateInput {
    return {
      id: entity.id,
      document: entity.document,
      name: entity.name,
      address: entity.address,
      number: entity.number,
      complement: entity.complement ?? null,
      neighborhood: entity.neighborhood,
      city_code: entity.cityCode,
      state: entity.state,
      zip_code: entity.zipCode,
      is_foreign: entity.isForeign,
      country_code: entity.countryCode ?? null,
      phone: entity.phone ?? null,
      email: entity.email ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}
