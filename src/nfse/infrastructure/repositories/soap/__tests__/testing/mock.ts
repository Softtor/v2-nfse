import { ServiceInterface } from '@/nfse/domain/interfaces/common/service.interface';
import { ProviderInterface } from '@/nfse/domain/interfaces/common/provider.interface';
import { RpsInterface } from '@/nfse/domain/interfaces/common/rps.interface';
import { ServiceTakerInterface } from '@/nfse/domain/interfaces/common/service-taker.interface';
import { BatchInterface } from '@/nfse/domain/interfaces/common/batch.interface';

export const servico: ServiceInterface = {
  Valores: {
    ValorServicos: 87.0,
    ValorDeducoes: 0.0,
    ValorPis: 0.0,
    ValorCofins: 0.0,
    ValorInss: 0.0,
    ValorIr: 0.0,
    IssRetido: 2,
    ValorCsll: 0.0,
    ValorIss: 1.74,
    OutrasRetencoes: 0.0,
    ValTotTributos: 87.0,
    Aliquota: 0.02,
    DescontoIncondicionado: 0.0,
    DescontoCondicionado: 0.0,
  },
  ItemListaServico: '107',
  CodigoCnae: '6202300',
  CodigoTributacaoMunicipio: '0107',
  Discriminacao: 'teste',
  CodigoMunicipio: '4106902',
  ExigibilidadeISS: 0,
  MunicipioIncidencia: '4106902',
};

export const prestadorServico: ProviderInterface = {
  Cnpj: '46204900000151',
  InscricaoMunicipal: '010112006414',
};

export const tomadorServico: ServiceTakerInterface = {
  IdentificacaoTomador: {
    CpfCnpj: {
      Cpf: '07193020137',
    },
  },
  RazaoSocial: 'Joao Victor de Oliveira',
  Endereco: {
    Endereco: 'Nao informado',
    Numero: 'SN',
    Complemento: '-',
    Bairro: 'Nao informado',
    CodigoMunicipio: '5300108',
    Uf: 'DF',
    Cep: '71727003',
  },
  Contato: {},
};

export const rps: RpsInterface = {
  Rps: {
    InfRps: {
      IdentificacaoRps: {
        Numero: '6',
        Serie: '2',
        Tipo: '1',
      },
      DataEmissao: '2024-12-13T05:50:43',
      Status: '1',
      Servico: {
        Valores: {
          ValorServicos: 87.0,
          ValorDeducoes: 0.0,
          ValorPis: 0.0,
          ValorCofins: 0.0,
          ValorInss: 0.0,
          ValorIr: 0.0,
          ValorCsll: 0.0,
          ValorIss: 1.74,
          OutrasRetencoes: 0.0,
          IssRetido: 2,
          ValTotTributos: 87.0,
          Aliquota: 0.02,
          DescontoIncondicionado: 0.0,
          DescontoCondicionado: 0.0,
        },
        ItemListaServico: '107',
        CodigoCnae: '0',
        CodigoTributacaoMunicipio: '0107',
        Discriminacao: 'Teste de emissão de nota fiscal',
        CodigoMunicipio: '4106902',
        ExigibilidadeISS: 0,
        MunicipioIncidencia: '4106902',
      },
      Prestador: {
        Cnpj: '46204900000151',
        InscricaoMunicipal: '010112006414',
      },
      TomadorServico: {
        IdentificacaoTomador: {
          CpfCnpj: {
            Cpf: '07193020137',
          },
        },
        RazaoSocial: 'Joao Victor de Oliveira',
        Endereco: {
          Endereco: 'Q R O Conjunto C',
          Numero: '4',
          Complemento: 'Apos a adm',
          Bairro: 'Candangolandia',
          CodigoMunicipio: '5300108',
          Uf: 'DF',
          Cep: '71727003',
        },
        Contato: {},
      },
      Competencia: '2024-12-10',
      RegimeEspecialTributacao: '1',
      OptanteSimplesNacional: '2',
      IncentivadorCultural: '2',
      NaturezaOperacao: '1',
      IncentivoFiscal: '2',
      InformacoesComplementares: 'Nao informado',
    },
  },
};

export const batchRps: BatchInterface = {
  NumeroLote: '12',
  QuantidadeRps: '1',
  ListaRps: [rps],
  Cnpj: '46204900000151',
  InscricaoMunicipal: '010112006414',
};
