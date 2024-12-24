import { NfseEntity } from '@/nfse/domain/entities/nfse.entity';
import { NfseMapper } from '../../nfse.mapper';
import { nfseMock } from '../testing/mocks';

describe('NfseMapper', () => {
  describe('toWS', () => {
    it('should map NfseResponse to NfseProps', () => {
      const nfseResponse = {
        ConsultarNfsePorRpsResult: {
          CompNfse: {
            Nfse: {
              InfNfse: {
                Numero: nfseMock.number,
                CodigoVerificacao: nfseMock.verificationCode,
                DataEmissao: nfseMock.issueDate,
                IdentificacaoRps: {
                  Numero: nfseMock.rpsIdentification.number,
                  Serie: nfseMock.rpsIdentification.series,
                  Tipo: nfseMock.rpsIdentification.type,
                },
                DataEmissaoRps: nfseMock.rpsIssueDate,
                NaturezaOperacao: nfseMock.operationNature,
                RegimeEspecialTributacao: nfseMock.specialTaxRegime,
                OptanteSimplesNacional: nfseMock.simpleNationalOption,
                IncentivadorCultural: nfseMock.culturalIncentive,
                Competencia: nfseMock.competence,
                NfseSubstituida: nfseMock.replacedNfse,
                Servico: {
                  Valores: {
                    ValorServicos: nfseMock.service.values.serviceValue,
                    NumeroDeducao: nfseMock.service.values.deductionNumber,
                    ValorDeducoes: nfseMock.service.values.deductionValue,
                    ValorPis: nfseMock.service.values.pisValue,
                    ValorCofins: nfseMock.service.values.cofinsValue,
                    ValorInss: nfseMock.service.values.inssValue,
                    ValorIr: nfseMock.service.values.irValue,
                    ValorCsll: nfseMock.service.values.csllValue,
                    IssRetido: nfseMock.service.values.withheldIss,
                    ValorIss: nfseMock.service.values.issValue,
                    ValorIssRetido: nfseMock.service.values.withheldIssValue,
                    OutrasRetencoes: nfseMock.service.values.otherRetentions,
                    BaseCalculo: nfseMock.service.values.calculationBase,
                    Aliquota: nfseMock.service.values.rate,
                    ValorLiquidoNfse: nfseMock.service.values.netNfseValue,
                    DescontoIncondicionado:
                      nfseMock.service.values.unconditionalDiscount,
                    DescontoCondicionado:
                      nfseMock.service.values.conditionalDiscount,
                  },
                  ItemListaServico: nfseMock.service.serviceListItem,
                  CodigoCnae: nfseMock.service.cnaeCode,
                  CodigoTributacaoMunicipio:
                    nfseMock.service.municipalTaxationCode,
                  Discriminacao: nfseMock.service.description,
                  CodigoMunicipio: nfseMock.service.municipalityCode,
                },
                ValorCredito: nfseMock.creditValue,
                PrestadorServico: {
                  IdentificacaoPrestador: {
                    Cnpj: nfseMock.serviceProvider.providerIdentification.cnpj,
                    InscricaoMunicipal:
                      nfseMock.serviceProvider.providerIdentification
                        .municipalRegistration,
                  },
                  NomeFantasia: nfseMock.serviceProvider.tradeName,
                  Endereco: {
                    Endereco: nfseMock.serviceProvider.address.street,
                    Numero: nfseMock.serviceProvider.address.number,
                    Bairro: nfseMock.serviceProvider.address.neighborhood,
                    CodigoMunicipio:
                      nfseMock.serviceProvider.address.municipalityCode,
                    Uf: nfseMock.serviceProvider.address.state,
                    Cep: nfseMock.serviceProvider.address.zipCode,
                  },
                },
                TomadorServico: {
                  IdentificacaoTomador: {
                    CpfCnpj: {
                      Cnpj: nfseMock.serviceRecipient.recipientIdentification
                        .cpfCnpj.cnpj,
                      Cpf: nfseMock.serviceRecipient.recipientIdentification
                        .cpfCnpj.cpf,
                    },
                  },
                  RazaoSocial: nfseMock.serviceRecipient.businessName,
                  Endereco: {
                    CodigoMunicipio:
                      nfseMock.serviceRecipient.address.municipalityCode,
                    Cep: nfseMock.serviceRecipient.address.zipCode,
                  },
                  Contato: {
                    Telefone: nfseMock.serviceRecipient.contact.phone,
                    Email: nfseMock.serviceRecipient.contact.email,
                  },
                },
              },
            },
          },
        },
      };

      const nfseEntity: NfseEntity = new NfseEntity({
        number: nfseMock.number,
        verificationCode: nfseMock.verificationCode,
        issueDate: nfseMock.issueDate,
        rpsIdentification: nfseMock.rpsIdentification,
        rpsIssueDate: nfseMock.rpsIssueDate,
        operationNature: nfseMock.operationNature,
        specialTaxRegime: nfseMock.specialTaxRegime,
        simpleNationalOption: nfseMock.simpleNationalOption,
        culturalIncentive: nfseMock.culturalIncentive,
        competence: nfseMock.competence,
        replacedNfse: nfseMock.replacedNfse,
        service: nfseMock.service,
        creditValue: nfseMock.creditValue,
        serviceProvider: nfseMock.serviceProvider,
        serviceRecipient: nfseMock.serviceRecipient,
      });

      const result = NfseMapper.toWS(nfseEntity);

      expect(result).toEqual(nfseResponse);
    });
  });

  describe('fromWS', () => {
    it('should map NfseResponse to NfseProps correctly', () => {
      const nfseResponse = {
        ConsultarNfsePorRpsResult: {
          CompNfse: {
            Nfse: {
              InfNfse: {
                Numero: nfseMock.number,
                CodigoVerificacao: nfseMock.verificationCode,
                DataEmissao: nfseMock.issueDate,
                IdentificacaoRps: {
                  Numero: nfseMock.rpsIdentification.number,
                  Serie: nfseMock.rpsIdentification.series,
                  Tipo: nfseMock.rpsIdentification.type,
                },
                DataEmissaoRps: nfseMock.rpsIssueDate,
                NaturezaOperacao: nfseMock.operationNature,
                RegimeEspecialTributacao: nfseMock.specialTaxRegime,
                OptanteSimplesNacional: nfseMock.simpleNationalOption,
                IncentivadorCultural: nfseMock.culturalIncentive,
                Competencia: nfseMock.competence,
                NfseSubstituida: nfseMock.replacedNfse,
                Servico: {
                  Valores: {
                    ValorServicos: nfseMock.service.values.serviceValue,
                    NumeroDeducao: nfseMock.service.values.deductionNumber,
                    ValorDeducoes: nfseMock.service.values.deductionValue,
                    ValorPis: nfseMock.service.values.pisValue,
                    ValorCofins: nfseMock.service.values.cofinsValue,
                    ValorInss: nfseMock.service.values.inssValue,
                    ValorIr: nfseMock.service.values.irValue,
                    ValorCsll: nfseMock.service.values.csllValue,
                    IssRetido: nfseMock.service.values.withheldIss,
                    ValorIss: nfseMock.service.values.issValue,
                    ValorIssRetido: nfseMock.service.values.withheldIssValue,
                    OutrasRetencoes: nfseMock.service.values.otherRetentions,
                    BaseCalculo: nfseMock.service.values.calculationBase,
                    Aliquota: nfseMock.service.values.rate,
                    ValorLiquidoNfse: nfseMock.service.values.netNfseValue,
                    DescontoIncondicionado:
                      nfseMock.service.values.unconditionalDiscount,
                    DescontoCondicionado:
                      nfseMock.service.values.conditionalDiscount,
                  },
                  ItemListaServico: nfseMock.service.serviceListItem,
                  CodigoCnae: nfseMock.service.cnaeCode,
                  CodigoTributacaoMunicipio:
                    nfseMock.service.municipalTaxationCode,
                  Discriminacao: nfseMock.service.description,
                  CodigoMunicipio: nfseMock.service.municipalityCode,
                },
                ValorCredito: nfseMock.creditValue,
                PrestadorServico: {
                  IdentificacaoPrestador: {
                    Cnpj: nfseMock.serviceProvider.providerIdentification.cnpj,
                    InscricaoMunicipal:
                      nfseMock.serviceProvider.providerIdentification
                        .municipalRegistration,
                  },
                  NomeFantasia: nfseMock.serviceProvider.tradeName,
                  Endereco: {
                    Endereco: nfseMock.serviceProvider.address.street,
                    Numero: nfseMock.serviceProvider.address.number,
                    Bairro: nfseMock.serviceProvider.address.neighborhood,
                    CodigoMunicipio:
                      nfseMock.serviceProvider.address.municipalityCode,
                    Uf: nfseMock.serviceProvider.address.state,
                    Cep: String(nfseMock.serviceProvider.address.zipCode),
                  },
                },
                TomadorServico: {
                  IdentificacaoTomador: {
                    CpfCnpj: {
                      Cpf: nfseMock.serviceRecipient.recipientIdentification
                        .cpfCnpj.cpf,
                      Cnpj: nfseMock.serviceRecipient.recipientIdentification
                        .cpfCnpj.cnpj,
                    },
                  },
                  RazaoSocial: nfseMock.serviceRecipient.businessName,
                  Endereco: {
                    CodigoMunicipio:
                      nfseMock.serviceRecipient.address.municipalityCode,
                    Cep: String(nfseMock.serviceRecipient.address.zipCode),
                  },
                  Contato: {
                    Telefone: nfseMock.serviceRecipient.contact.phone,
                    Email: nfseMock.serviceRecipient.contact.email,
                  },
                },
              },
            },
          },
        },
      };

      const nfseEntityMock = new NfseEntity(nfseMock);

      const result = NfseMapper.fromWS(nfseResponse);

      expect(result).toEqual(nfseEntityMock);
    });
  });
});
