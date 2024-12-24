import { FiscalTakerAndServiceOutputDto } from './fiscal-taker-and-service-output-dto';

export class RpsDTO {
  number: number;
  series: string;
  issueDateRps?: Date;
  type: string;
  status: string;
  competence?: Date;
  complementaryInformation?: string;
  serviceId: string;
  takerId: string;
  providerId?: string;
  batchId?: string;
  customValue?: number;
}

export class ServiceDTO {
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
  externalPlanCode?: string;
}

export class TakerDTO {
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
}

export class CreateFiscalRpsDTO {
  rps: RpsDTO;
  service: FiscalTakerAndServiceOutputDto['service'];
  taker: FiscalTakerAndServiceOutputDto['taker'];
}

export type UpdateFiscalRpsDTO = {
  id: string;
  batchId?: string;
  issueDateRps?: Date;
};
