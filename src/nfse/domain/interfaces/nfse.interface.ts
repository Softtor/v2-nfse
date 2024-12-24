export interface NfseResponse {
  ConsultarNfsePorRpsResult: {
    CompNfse?: {
      Nfse: {
        InfNfse: {
          Numero: string;
          CodigoVerificacao: string;
          DataEmissao: string;
          IdentificacaoRps: {
            Numero: string;
            Serie: string;
            Tipo: string;
          };
          DataEmissaoRps: string;
          NaturezaOperacao: string;
          RegimeEspecialTributacao: string;
          OptanteSimplesNacional: string;
          IncentivadorCultural: string;
          Competencia: string;
          NfseSubstituida: string;
          Servico: {
            Valores: {
              ValorServicos: number;
              NumeroDeducao?: number;
              ValorDeducoes: number;
              ValorPis: number;
              ValorCofins: number;
              ValorInss: number;
              ValorIr: number;
              ValorCsll: number;
              IssRetido: 1 | 2;
              ValorIss: number;
              ValorIssRetido: string;
              OutrasRetencoes: number;
              BaseCalculo: number;
              Aliquota: number;
              ValorLiquidoNfse: number;
              DescontoIncondicionado: number;
              DescontoCondicionado: number;
            };
            ItemListaServico: string;
            CodigoCnae: number;
            CodigoTributacaoMunicipio: string;
            Discriminacao: string;
            CodigoMunicipio: number;
          };
          ValorCredito: number;
          PrestadorServico: {
            IdentificacaoPrestador: {
              Cnpj: string;
              InscricaoMunicipal: string;
            };
            NomeFantasia: string;
            Endereco: {
              Endereco: string;
              Numero: string;
              Bairro: string;
              CodigoMunicipio: number;
              Uf: string;
              Cep?: string;
            };
          };
          TomadorServico: {
            IdentificacaoTomador: {
              CpfCnpj: {
                Cpf?: string;
                Cnpj?: string;
              };
            };
            RazaoSocial: string;
            Endereco: {
              CodigoMunicipio: number;
              Cep?: string;
            };
            Contato?: {
              Telefone?: string;
              Email?: string;
            } | null;
          };
        };
      };
    };
    ListaMensagemRetorno?: {
      MensagemRetorno: {
        Codigo: string;
        Mensagem: string;
        Correcao: string;
      }[];
    };
  };
}

export interface NfseProps {
  number: string;
  verificationCode: string;
  issueDate: string;
  rpsIdentification: {
    number: string;
    series: string;
    type: string;
  };
  rpsIssueDate: string;
  operationNature: string;
  specialTaxRegime: string;
  simpleNationalOption: string;
  culturalIncentive: string;
  competence: string;
  replacedNfse: string;
  service: {
    values: {
      serviceValue: number;
      deductionNumber?: number;
      deductionValue: number;
      pisValue: number;
      cofinsValue: number;
      inssValue: number;
      irValue: number;
      csllValue: number;
      withheldIss: 1 | 2;
      issValue: number;
      withheldIssValue?: string;
      netNfseValue: number;
      otherRetentions: number;
      calculationBase: number;
      rate: number;
      unconditionalDiscount?: number;
      conditionalDiscount?: number;
    };
    serviceListItem: string;
    cnaeCode: number;
    municipalTaxationCode: string;
    description: string;
    municipalityCode: number;
  };
  creditValue: number;
  serviceProvider: {
    providerIdentification: {
      cnpj: string;
      municipalRegistration: string;
    };
    tradeName: string;
    address: {
      street: string;
      number: string;
      neighborhood: string;
      municipalityCode: number;
      state: string;
      zipCode: string;
    };
  };
  serviceRecipient: {
    recipientIdentification: {
      cpfCnpj: {
        cpf?: string;
        cnpj?: string;
      };
    };
    businessName: string;
    address: {
      municipalityCode: number;
      zipCode: string;
    };
    contact?: {
      phone?: string;
      email?: string;
    } | null;
  };
}
