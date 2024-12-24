export const ConsultNfseByRpsMockResult = {
  ConsultarNfsePorRpsResult: {
    CompNfse: {
      Nfse: {
        InfNfse: {
          CodigoVerificacao: '6F39B802',
          Competencia: new Date('0001-01-01T03:06:28.000Z'), // Garantir que seja uma string
          DataEmissao: new Date('2024-12-13T08:50:43.000Z'),
          DataEmissaoRps: new Date('2024-12-13T08:50:43.000Z'),
          IdentificacaoRps: {
            Numero: '6',
            Serie: '2',
            Tipo: '1',
          },
          IncentivadorCultural: '2',
          NaturezaOperacao: '1',
          NfseSubstituida: '0',
          Numero: '868',
          OptanteSimplesNacional: '2',
          PrestadorServico: {
            Endereco: {
              Bairro: 'CENTRO',
              Cep: 80020000,
              CodigoMunicipio: 4106902,
              Endereco: 'VOLUNTÁRIOS DA PÁTRIA',
              Numero: '368 CJ 505',
              Uf: 'PR',
            },
            IdentificacaoPrestador: {
              Cnpj: '46204900000151',
              InscricaoMunicipal: '01 01 1200641-4',
            },
            NomeFantasia: 'WHITE SISTEMAS E TECNOLOGIA LTDA',
          },
          RegimeEspecialTributacao: '0',
          Servico: {
            CodigoCnae: 0,
            CodigoMunicipio: 4106902,
            CodigoTributacaoMunicipio: '0107',
            Discriminacao: 'Teste de emissão de nota fiscal',
            ItemListaServico: '107',
            Valores: {
              Aliquota: 0.02,
              BaseCalculo: 87,
              DescontoCondicionado: 0,
              DescontoIncondicionado: 0,
              IssRetido: '2',
              NumeroDeducao: 0,
              OutrasRetencoes: 0,
              ValorCofins: 0,
              ValorCsll: 0,
              ValorDeducoes: 0,
              ValorInss: 0,
              ValorIr: 0,
              ValorIss: 1.74,
              ValorIssRetido: 0,
              ValorLiquidoNfse: 87,
              ValorPis: 0,
              ValorServicos: 87,
            },
          },
          TomadorServico: {
            Contato: null,
            Endereco: {
              Cep: 0,
              CodigoMunicipio: 0,
            },
            IdentificacaoTomador: {
              CpfCnpj: {
                Cpf: '07193020137',
              },
            },
            RazaoSocial: 'Joao Victor de Oliveira',
          },
          ValorCredito: 0.26,
        },
      },
    },
    ListaMensagemRetorno: null,
  },
};
