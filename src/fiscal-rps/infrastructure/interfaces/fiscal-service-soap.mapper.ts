import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { ServiceInterface } from '@/nfse/domain/interfaces/common/service.interface';

export class ServiceMapper {
  static toSoapFormat(
    service: FiscalServiceEntity,
    customValue?: number,
  ): ServiceInterface {
    return {
      Valores: {
        ValorServicos: customValue ?? (service.serviceValue || 0.0),
        ValorDeducoes: service.deductionValue || 0.0,
        ValorPis: service.pisValue || 0.0,
        ValorCofins: service.cofinsValue || 0.0,
        ValorInss: service.inssValue || 0.0,
        ValorIr: service.irValue || 0.0,
        ValorCsll: service.csllValue || 0.0,
        ValorIss: service.issValue || 0.0,
        OutrasRetencoes: service.otherRetentions || 0.0,
        IssRetido:
          service.issWithheld === 1 || service.issWithheld === 2
            ? service.issWithheld
            : 1,
        ValTotTributos: service.totalTributesValue || 0.0,
        Aliquota: service.rate || 0.0,
        DescontoIncondicionado: service.unconditionalDiscount || 0.0,
        DescontoCondicionado: service.conditionalDiscount || 0.0,
      },
      ItemListaServico: service.serviceItemList || '',
      CodigoCnae: service.cnaeCode || '0',
      CodigoTributacaoMunicipio: service.municipalTaxationCode || '',
      Discriminacao: service.serviceDescription || '',
      CodigoMunicipio: service.municipalityCode || '',
      ExigibilidadeISS: service.issExigibility || 0,
      MunicipioIncidencia: service.incidenceMunicipality || '',
    };
  }
}
