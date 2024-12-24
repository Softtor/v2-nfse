import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Prisma, FiscalService } from '@prisma/client';
import {
  FiscalServiceEntity,
  FiscalServiceProps,
} from '@/fiscal-rps/domain/entities/fiscal-service.entity';

export class FiscalServiceModelMapper {
  static toEntity(model: FiscalService): FiscalServiceEntity {
    const data: FiscalServiceProps = {
      serviceValue: model.service_value,
      deductionValue: model.deduction_value,
      pisValue: model.pis_value,
      cofinsValue: model.cofins_value ?? undefined,
      inssValue: model.inss_value ?? undefined,
      irValue: model.ir_value ?? undefined,
      csllValue: model.csll_value ?? undefined,
      otherRetentions: model.other_retentions ?? undefined,
      totalTributesValue: model.total_tributes_value ?? undefined,
      issValue: model.iss_value ?? undefined,
      rate: model.rate ?? undefined,
      nbsCode: model.nbs_code ?? undefined,
      unconditionalDiscount: model.unconditional_discount,
      conditionalDiscount: model.conditional_discount,
      issWithheld: model.iss_withheld,
      serviceItemList: model.service_item_list,
      cnaeCode: model.cnae_code,
      municipalTaxationCode: model.municipal_taxation_code,
      serviceDescription: model.service_description,
      municipalityCode: model.municipality_code,
      issExigibility: model.iss_exigibility,
      incidenceMunicipality: model.incidence_municipality,
      externalPlanCode: model.external_plan_code,
      createdAt: model.created_at,
    };

    try {
      return new FiscalServiceEntity(data, model.id);
    } catch (error) {
      console.error('Error creating FiscalServiceEntity:', error);
      throw new ValidationError('An entity could not be loaded');
    }
  }

  static toPrisma(
    entity: FiscalServiceEntity,
  ): Prisma.FiscalServiceCreateInput {
    return {
      id: entity.id,
      service_value: entity.serviceValue,
      deduction_value: entity.deductionValue,
      pis_value: entity.pisValue,
      cofins_value: entity.cofinsValue ?? null,
      inss_value: entity.inssValue ?? null,
      ir_value: entity.irValue ?? null,
      csll_value: entity.csllValue ?? null,
      other_retentions: entity.otherRetentions ?? null,
      total_tributes_value: entity.totalTributesValue ?? null,
      iss_value: entity.issValue ?? null,
      rate: entity.rate ?? null,
      nbs_code: entity.nbsCode ?? null,
      unconditional_discount: entity.unconditionalDiscount,
      conditional_discount: entity.conditionalDiscount,
      iss_withheld: entity.issWithheld,
      service_item_list: entity.serviceItemList,
      cnae_code: entity.cnaeCode,
      municipal_taxation_code: entity.municipalTaxationCode,
      service_description: entity.serviceDescription,
      municipality_code: entity.municipalityCode,
      iss_exigibility: entity.issExigibility,
      incidence_municipality: entity.incidenceMunicipality,
      external_plan_code: entity.externalPlanCode,
      created_at: entity.createdAt,
    };
  }
}
