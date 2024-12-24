import { Prisma, FiscalEmitter } from '@prisma/client';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';

export class FiscalEmitterModelMapper {
  static toEntity(model: FiscalEmitter): FiscalEmitterEntity {
    const address = new AddressEntity({
      address: model.address,
      number: model.number,
      complement: model.complement ?? undefined,
      neighborhood: model.neighborhood,
      municipalityCode: model.municipality_code,
      state: model.state,
      postalCode: model.postal_code ?? '',
    });

    const data = {
      name: model.name,
      document: model.document,
      email: model.email ?? undefined,
      phone: model.phone ?? undefined,
      nickname: model.nickname ?? undefined,
      address,
      city: model.city ?? undefined,
      crt: model.crt ?? undefined,
      ie: model.ie ?? undefined,
      im: model.im ?? undefined,
      cnaeCode: model.cnae_code ?? undefined,
      activityCode: model.activity_code ?? undefined,
      aliquot: model.aliquot ? parseFloat(model.aliquot.toString()) : undefined,
      iss: model.iss ? parseFloat(model.iss.toString()) : undefined,
      cofins: model.cofins ? parseFloat(model.cofins.toString()) : undefined,
      csll: model.csll ? parseFloat(model.csll.toString()) : undefined,
      inss: model.inss ? parseFloat(model.inss.toString()) : undefined,
      ir: model.ir ? parseFloat(model.ir.toString()) : undefined,
      pis: model.pis ? parseFloat(model.pis.toString()) : undefined,
      issWithheld: model.iss_withheld ?? undefined,
      serviceItemList: model.service_item_list ?? undefined,
      municipalTaxationCode: model.municipal_taxation_code ?? undefined,
      issEligibility: model.iss_eligibility ?? undefined,
      createdAt: model.created_at,
      updatedAt: model.updated_at,
    };

    try {
      return new FiscalEmitterEntity(data, model.id);
    } catch (error) {
      console.error('Error creating FiscalEmitterEntity:', error);
      throw new ValidationError('An entity could not be loaded');
    }
  }

  static toPrisma(
    entity: FiscalEmitterEntity,
  ): Prisma.FiscalEmitterCreateInput {
    return {
      name: entity.name,
      document: entity.document,
      email: entity.email ?? null,
      phone: entity.phone ?? null,
      nickname: entity.nickname ?? null,
      address: entity.address.address,
      number: entity.address.number,
      complement: entity.address.complement ?? null,
      neighborhood: entity.address.neighborhood,
      state: entity.address.state,
      city: entity.city ?? null,
      municipality_code: entity.address.municipalityCode,
      postal_code: entity.address.postalCode,
      crt: entity.crt ?? null,
      ie: entity.ie ?? null,
      im: entity.im ?? null,
      cnae_code: entity.cnaeCode ?? null,
      activity_code: entity.activityCode ?? null,
      aliquot: entity.aliquot ?? null,
      iss: entity.iss ?? null,
      cofins: entity.cofins ?? null,
      csll: entity.csll ?? null,
      inss: entity.inss ?? null,
      ir: entity.ir ?? null,
      pis: entity.pis ?? null,
      iss_withheld: entity.issWithheld ?? null,
      service_item_list: entity.serviceItemList ?? null,
      municipal_taxation_code: entity.municipalTaxationCode ?? null,
      iss_eligibility: entity.issEligibility ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}
