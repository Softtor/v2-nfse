import { RpsInterface } from '@/nfse/domain/interfaces/common/rps.interface';
import { ServiceMapper } from './fiscal-service-soap.mapper';
import { ProviderMapper } from './fiscal-provider-soap.mapper';
import { TakerMapper } from './fiscal-taker-soap.mapper';
import { service } from '../../../nfse/domain/entities/__tests__/testing/mocks';

interface ExtendedRpsInterface extends RpsInterface {
  rpsId: string;
  providerId: string;
}

export class RpsMapper {
  static toSoapFormat(rpsData: any): ExtendedRpsInterface {
    return {
      Rps: {
        InfRps: {
          IdentificacaoRps: {
            Numero: rpsData.loteRps.props.number.toString(),
            Serie: rpsData.loteRps.props.series,
            Tipo: rpsData.loteRps.props.type,
          },
          DataEmissao:
            rpsData.loteRps.issueDateRps?.toISOString() ||
            new Date().toISOString(),
          Status: rpsData.loteRps.status,
          Servico: ServiceMapper.toSoapFormat(rpsData.loteRps.service),
          Prestador: ProviderMapper.toSoapFormat(rpsData.loteRps.provider),
          TomadorServico: TakerMapper.toSoapFormat(rpsData.loteRps.taker),
          Competencia:
            rpsData.loteRps.competence?.toISOString().split('T')[0] || '',
          RegimeEspecialTributacao:
            rpsData.loteRps.nfConfig?.taxationRegime || '1',
          OptanteSimplesNacional: rpsData.loteRps.nfConfig?.simpleNational
            ? '1'
            : '2',
          IncentivadorCultural: rpsData.loteRps.nfConfig?.culturalIncentivize
            ? '1'
            : '2',
          NaturezaOperacao: rpsData.loteRps.nfConfig?.operationNature ?? '1',
          IncentivoFiscal: rpsData.loteRps.nfConfig?.fiscalIncentivize
            ? '1'
            : '2',
          InformacoesComplementares:
            rpsData.loteRps.complementaryInformation || 'Nao informado',
        },
      },
      rpsId: rpsData.rpsId,
      providerId: rpsData.providerId,
    };
  }
}
