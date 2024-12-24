import { ProviderMapper, WsProvider } from './provider.mapper';
import { ServiceMapper, WsService } from './service.mapper';
import { ServiceTakerMapper, WsServiceTaker } from './service-taker.mapper';
import { ServiceEntity } from '@/nfse/domain/entities/service.entity';
import { ProviderEntity } from '@/nfse/domain/entities/provider.entity';
import { ServiceTakerEntity } from '@/nfse/domain/entities/service-taker.entity';
import { RpsEntity, RpsProps } from '@/nfse/domain/entities/rps.entity';

export interface WsRps {
  Rps: {
    InfRps: {
      IdentificacaoRps: {
        Numero: string;
        Serie: string;
        Tipo: string;
      };
      DataEmissao: string;
      Status: string;
      Servico: WsService;
      Prestador: WsProvider;
      TomadorServico?: WsServiceTaker;
      Tomador?: WsServiceTaker;
      Competencia: string;
      RegimeEspecialTributacao: string;
      OptanteSimplesNacional: string;
      IncentivoFiscal: string;
      InformacoesComplementares: string;
      IncentivadorCultural: '1' | '2';
      NaturezaOperacao: string;
    };
  };
}

export class RpsMapper {
  private entity: RpsEntity;

  constructor(rpsEntity: RpsEntity) {
    this.entity = rpsEntity;
  }

  static fromWS(wsRps: WsRps): RpsEntity {
    const {
      IdentificacaoRps: { Numero, Serie, Tipo },
      DataEmissao,
      Status,
    } = wsRps.Rps.InfRps;
    const {
      Servico,
      Prestador,
      TomadorServico,
      Competencia,
      RegimeEspecialTributacao,
      OptanteSimplesNacional,
      IncentivoFiscal,
      InformacoesComplementares,
      IncentivadorCultural,
    } = wsRps.Rps.InfRps;

    const rpsProps: RpsProps = {
      identification: {
        number: Numero,
        series: Serie,
        type: Tipo,
      },
      emissionDate: DataEmissao,
      status: Status,
      service: ServiceMapper.fromWS(Servico).props,
      provider: ProviderMapper.fromWS(Prestador).props,
      serviceTaker: ServiceTakerMapper.fromWS(TomadorServico).props,
      competence: Competencia,
      specialTaxRegime: RegimeEspecialTributacao,
      simpleNationalOptant: OptanteSimplesNacional,
      fiscalIncentive: IncentivoFiscal,
      additionalInformation: InformacoesComplementares,
      culturalIncentive: IncentivadorCultural,
      natureOperation: wsRps.Rps.InfRps.NaturezaOperacao,
    };

    const wsEntity = new RpsEntity(rpsProps);
    return wsEntity;
  }

  toWS(): WsRps {
    const {
      identification,
      emissionDate,
      status,
      service,
      provider,
      serviceTaker,
      competence,
      specialTaxRegime,
      simpleNationalOptant,
      fiscalIncentive,
      additionalInformation,
      culturalIncentive,
      natureOperation,
    } = this.entity;

    const identificacaoRps = {
      IdentificacaoRps: {
        Numero: identification.number,
        Serie: identification.series,
        Tipo: identification.type,
      },
    };

    const rpsNode = {
      InfRps: {
        ...identificacaoRps,
        DataEmissao: emissionDate,
        Status: status,
        Servico: new ServiceMapper(new ServiceEntity(service)).toWS(),
        Prestador: new ProviderMapper(new ProviderEntity(provider)).toWS(),
        Tomador: new ServiceTakerMapper(
          new ServiceTakerEntity(serviceTaker),
        ).toWS(),
        Competencia: competence,
        RegimeEspecialTributacao: specialTaxRegime,
        OptanteSimplesNacional: simpleNationalOptant,
        IncentivoFiscal: fiscalIncentive,
        InformacoesComplementares: additionalInformation,
        IncentivadorCultural: culturalIncentive,
        NaturezaOperacao: natureOperation,
      },
    };

    return { Rps: rpsNode };
  }
}
