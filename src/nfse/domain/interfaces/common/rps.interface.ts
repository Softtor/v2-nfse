import { ProviderInterface } from './provider.interface';
import { ServiceInterface } from './service.interface';
import { ServiceTakerInterface } from './service-taker.interface';

export interface RpsInterface {
  Rps: {
    InfRps: {
      IdentificacaoRps: {
        Numero: string;
        Serie: string;
        Tipo: string;
      };
      DataEmissao: string;
      Status: string;
      Servico: ServiceInterface;
      Prestador: ProviderInterface;
      Tomador?: ServiceTakerInterface;
      TomadorServico?: ServiceTakerInterface;
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
