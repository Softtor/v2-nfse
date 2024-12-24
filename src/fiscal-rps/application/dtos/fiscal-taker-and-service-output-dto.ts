import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';

export type FiscalTakerAndServiceOutputDto = {
  taker: {
    id: string;
    document: string;
    name: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    cityCode: string;
    state: string;
    zipCode: string;
    isForeign: boolean;
    countryCode?: string;
    phone?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  service: {
    id: string;
    serviceValue: number;
    deductionValue: number;
    pisValue: number;
    cofinsValue?: number;
    inssValue?: number;
    irValue?: number;
    csllValue?: number;
    otherRetentions?: number;
    totalTributesValue?: number;
    issValue?: number;
    rate?: number;
    nbsCode?: string;
    unconditionalDiscount: number;
    conditionalDiscount: number;
    issWithheld: number;
    serviceItemList: string;
    cnaeCode: string;
    municipalTaxationCode: string;
    serviceDescription: string;
    municipalityCode: string;
    issExigibility: number;
    incidenceMunicipality: string;
    externalPlanCode: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
};

export class FiscalTakerAndServiceOutputMapper {
  static toTakerOutput(
    taker?: FiscalTakerEntity,
  ): FiscalTakerAndServiceOutputDto['taker'] {
    return {
      id: taker.id,
      document: taker.document,
      name: taker.name,
      address: taker.address,
      number: taker.number,
      complement: taker.complement,
      neighborhood: taker.neighborhood,
      cityCode: taker.cityCode,
      state: taker.state,
      zipCode: taker.zipCode,
      isForeign: taker.isForeign,
      countryCode: taker.countryCode,
      phone: taker.phone,
      email: taker.email,
      createdAt: taker.createdAt,
      updatedAt: taker.updatedAt,
    };
  }

  static toServiceOutput(
    service?: FiscalServiceEntity,
  ): FiscalTakerAndServiceOutputDto['service'] {
    return {
      id: service.id,
      serviceValue: service.serviceValue,
      deductionValue: service.deductionValue,
      pisValue: service.pisValue,
      cofinsValue: service.cofinsValue,
      inssValue: service.inssValue,
      irValue: service.irValue,
      csllValue: service.csllValue,
      otherRetentions: service.otherRetentions,
      totalTributesValue: service.totalTributesValue,
      issValue: service.issValue,
      rate: service.rate,
      nbsCode: service.nbsCode,
      unconditionalDiscount: service.unconditionalDiscount,
      conditionalDiscount: service.conditionalDiscount,
      issWithheld: service.issWithheld,
      serviceItemList: service.serviceItemList,
      cnaeCode: service.cnaeCode,
      municipalTaxationCode: service.municipalTaxationCode,
      serviceDescription: service.serviceDescription,
      municipalityCode: service.municipalityCode,
      issExigibility: service.issExigibility,
      incidenceMunicipality: service.incidenceMunicipality,
      externalPlanCode: service.externalPlanCode,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };
  }
}
