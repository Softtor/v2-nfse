import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';

export type AddressOutputDto = {
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  municipalityCode: string;
  state: string;
  postalCode: string;
};

export type FiscalEmitterOutputDto = {
  id: string;
  name: string;
  document: string;
  email?: string;
  phone?: string;
  nickname?: string;
  address: AddressOutputDto;
  city?: string;
  crt?: string;
  ie?: string;
  im: string;
  cnaeCode?: string;
  activityCode?: string;
  aliquot?: number;
  iss?: number;
  cofins?: number;
  csll?: number;
  inss?: number;
  ir?: number;
  pis?: number;
  issWithheld?: number;
  serviceItemList?: string;
  municipalTaxationCode?: string;
  issEligibility?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class FiscalEmitterOutputMapper {
  static toOutput(entity: FiscalEmitterEntity): FiscalEmitterOutputDto {
    return {
      id: entity.id,
      name: entity.name,
      document: entity.document,
      email: entity.email,
      phone: entity.phone,
      nickname: entity.nickname,
      address: this.mapAddressToOutput(entity.address),
      city: entity.city,
      crt: entity.crt,
      ie: entity.ie,
      im: entity.im,
      cnaeCode: entity.cnaeCode,
      activityCode: entity.activityCode,
      aliquot: entity.aliquot,
      iss: entity.iss,
      cofins: entity.cofins,
      csll: entity.csll,
      inss: entity.inss,
      ir: entity.ir,
      pis: entity.pis,
      issWithheld: entity.issWithheld,
      serviceItemList: entity.serviceItemList,
      municipalTaxationCode: entity.municipalTaxationCode,
      issEligibility: entity.issEligibility,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private static mapAddressToOutput(address: AddressEntity): AddressOutputDto {
    return {
      address: address.address,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      municipalityCode: address.municipalityCode,
      state: address.state,
      postalCode: address.postalCode,
    };
  }
}
