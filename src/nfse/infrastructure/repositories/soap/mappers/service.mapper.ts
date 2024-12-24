import { ServiceEntity } from '@/nfse/domain/entities/service.entity';

export interface WsService {
  Valores: {
    ValorServicos: number;
    ValorDeducoes: number;
    ValorPis: number;
    DescontoIncondicionado: number;
    DescontoCondicionado: number;
    ValorCofins?: number;
    ValorInss?: number;
    ValorIr?: number;
    ValorCsll?: number;
    OutrasRetencoes?: number;
    ValTotTributos?: number;
    ValorIss?: number;
    Aliquota?: number;
    IssRetido: 1 | 2;
  };
  ItemListaServico: string;
  CodigoCnae: string;
  CodigoTributacaoMunicipio: string;
  Discriminacao: string;
  CodigoMunicipio: string;
  ExigibilidadeISS: number;
  MunicipioIncidencia: string;
  CodigoNbs?: string;
}

export class ServiceMapper {
  private entity: ServiceEntity;
  constructor(serviceEntity: ServiceEntity) {
    this.entity = serviceEntity;
  }
  toWS(): WsService {
    const valores: any = {
      ValorServicos: this.entity.serviceValue,
      ValorDeducoes: this.entity.deductionValue,
      ValorPis: this.entity.pisValue,
      DescontoIncondicionado: this.entity.unconditionalDiscount,
      DescontoCondicionado: this.entity.conditionalDiscount,
    };

    if (this.entity.cofinsValue !== undefined) {
      valores.ValorCofins = this.entity.cofinsValue;
    }
    if (this.entity.inssValue !== undefined) {
      valores.ValorInss = this.entity.inssValue;
    }
    if (this.entity.irValue !== undefined) {
      valores.ValorIr = this.entity.irValue;
    }
    if (this.entity.csllValue !== undefined) {
      valores.ValorCsll = this.entity.csllValue;
    }
    if (this.entity.otherRetentions !== undefined) {
      valores.OutrasRetencoes = this.entity.otherRetentions;
    }
    if (this.entity.totalTributesValue !== undefined) {
      valores.ValTotTributos = this.entity.totalTributesValue;
    }
    if (this.entity.issValue !== undefined) {
      valores.ValorIss = this.entity.issValue;
    }
    if (this.entity.rate !== undefined) {
      valores.Aliquota = this.entity.rate;
    }
    if (this.entity.issWithheld !== undefined) {
      valores.IssRetido = this.entity.issWithheld;
    }

    const xmlObj: WsService = {
      Valores: valores,
      ItemListaServico: this.entity.serviceItemList,
      CodigoCnae: this.entity.cnaeCode,
      CodigoTributacaoMunicipio: this.entity.municipalTaxationCode,
      Discriminacao: this.entity.serviceDescription,
      CodigoMunicipio: this.entity.municipalityCode,
      ExigibilidadeISS: this.entity.issExigibility,
      MunicipioIncidencia: this.entity.incidenceMunicipality,
    };

    if (this.entity.nbsCode !== undefined) {
      xmlObj.CodigoNbs = this.entity.nbsCode;
    }

    return xmlObj;
  }

  static fromWS(wsService: WsService): ServiceEntity {
    const {
      Valores,
      ItemListaServico,
      CodigoCnae,
      CodigoTributacaoMunicipio,
      Discriminacao,
      CodigoMunicipio,
      ExigibilidadeISS,
      MunicipioIncidencia,
      CodigoNbs,
    } = wsService;

    const serviceEntity = new ServiceEntity({
      serviceValue: Valores.ValorServicos,
      deductionValue: Valores.ValorDeducoes,
      pisValue: Valores.ValorPis,
      cofinsValue: Valores.ValorCofins,
      inssValue: Valores.ValorInss,
      irValue: Valores.ValorIr,
      csllValue: Valores.ValorCsll,
      otherRetentions: Valores.OutrasRetencoes,
      totalTributesValue: Valores.ValTotTributos,
      issValue: Valores.ValorIss,
      rate: Valores.Aliquota,
      issWithheld: Valores.IssRetido,
      unconditionalDiscount: Valores.DescontoIncondicionado,
      conditionalDiscount: Valores.DescontoCondicionado,
      serviceItemList: ItemListaServico,
      cnaeCode: CodigoCnae,
      municipalTaxationCode: CodigoTributacaoMunicipio,
      serviceDescription: Discriminacao,
      municipalityCode: CodigoMunicipio,
      issExigibility: ExigibilidadeISS,
      incidenceMunicipality: MunicipioIncidencia,
      nbsCode: CodigoNbs,
    });

    return serviceEntity;
  }
}
