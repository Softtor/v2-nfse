import { NfseEntity } from '@/nfse/domain/entities/nfse.entity';
import {
  NfseProps,
  NfseResponse,
} from '@/nfse/domain/interfaces/nfse.interface';

export class NfseMapper {
  /**
   * Mapeia os dados de NfseResponse para a entidade NfseEntity.
   * @param nfseResponse Resposta do serviço SOAP.
   * @returns Instância da entidade NfseEntity.
   */
  static fromWS(nfseResponse: NfseResponse): NfseEntity {
    const infNfse =
      nfseResponse.ConsultarNfsePorRpsResult?.CompNfse?.Nfse?.InfNfse;

    if (!infNfse) {
      throw new Error('InfNfse is missing in NfseResponse');
    }
    const nfseProps: NfseProps = {
      number: infNfse.Numero,
      verificationCode: infNfse.CodigoVerificacao,
      issueDate: infNfse.DataEmissao,
      rpsIdentification: {
        number: infNfse.IdentificacaoRps.Numero,
        series: infNfse.IdentificacaoRps.Serie,
        type: infNfse.IdentificacaoRps.Tipo,
      },
      rpsIssueDate: infNfse.DataEmissaoRps,
      operationNature: infNfse.NaturezaOperacao,
      specialTaxRegime: infNfse.RegimeEspecialTributacao,
      simpleNationalOption: infNfse.OptanteSimplesNacional,
      culturalIncentive: infNfse.IncentivadorCultural,
      competence: infNfse.Competencia,
      replacedNfse: infNfse.NfseSubstituida,
      service: {
        values: {
          serviceValue: infNfse.Servico.Valores.ValorServicos || 0,
          deductionNumber: infNfse.Servico.Valores.NumeroDeducao || 0,
          deductionValue: infNfse.Servico.Valores.ValorDeducoes || 0,
          pisValue: infNfse.Servico.Valores.ValorPis || 0,
          cofinsValue: infNfse.Servico.Valores.ValorCofins || 0,
          inssValue: infNfse.Servico.Valores.ValorInss || 0,
          irValue: infNfse.Servico.Valores.ValorIr || 0,
          csllValue: infNfse.Servico.Valores.ValorCsll || 0,
          withheldIss: infNfse.Servico.Valores.IssRetido,
          issValue: infNfse.Servico.Valores.ValorIss || 0,
          withheldIssValue: infNfse.Servico.Valores.ValorIssRetido,
          otherRetentions: infNfse.Servico.Valores.OutrasRetencoes || 0,
          calculationBase: infNfse.Servico.Valores.BaseCalculo || 0,
          rate: infNfse.Servico.Valores.Aliquota || 0,
          netNfseValue: infNfse.Servico.Valores.ValorLiquidoNfse || 0,
          unconditionalDiscount:
            infNfse.Servico.Valores.DescontoIncondicionado || 0,
          conditionalDiscount:
            infNfse.Servico.Valores.DescontoCondicionado || 0,
        },
        serviceListItem: infNfse.Servico.ItemListaServico || '',
        cnaeCode: infNfse.Servico.CodigoCnae || 0,
        municipalTaxationCode: infNfse.Servico.CodigoTributacaoMunicipio || '',
        description: infNfse.Servico.Discriminacao || '',
        municipalityCode: infNfse.Servico.CodigoMunicipio || 0,
      },
      creditValue: infNfse.ValorCredito || 0,
      serviceProvider: {
        providerIdentification: {
          cnpj: infNfse.PrestadorServico.IdentificacaoPrestador.Cnpj || '',
          municipalRegistration:
            infNfse.PrestadorServico.IdentificacaoPrestador
              .InscricaoMunicipal || '',
        },
        tradeName: infNfse.PrestadorServico.NomeFantasia || '',
        address: {
          street: infNfse.PrestadorServico.Endereco.Endereco || '',
          number: infNfse.PrestadorServico.Endereco.Numero || '',
          neighborhood: infNfse.PrestadorServico.Endereco.Bairro || '',
          municipalityCode:
            infNfse.PrestadorServico.Endereco.CodigoMunicipio || 0,
          state: infNfse.PrestadorServico.Endereco.Uf || '',
          zipCode: String(infNfse.PrestadorServico.Endereco.Cep) || '',
        },
      },
      serviceRecipient: {
        recipientIdentification: {
          cpfCnpj: {
            cpf: infNfse.TomadorServico.IdentificacaoTomador.CpfCnpj.Cpf || '',
            cnpj:
              infNfse.TomadorServico.IdentificacaoTomador.CpfCnpj.Cnpj ||
              undefined,
          },
        },
        businessName: infNfse.TomadorServico.RazaoSocial || '',
        address: {
          municipalityCode:
            infNfse.TomadorServico.Endereco.CodigoMunicipio || 0,
          zipCode: String(infNfse.TomadorServico.Endereco.Cep) || '',
        },
        contact: infNfse.TomadorServico.Contato
          ? {
              phone: infNfse.TomadorServico.Contato?.Telefone || '',
              email: infNfse.TomadorServico.Contato?.Email || '',
            }
          : {},
      },
    };

    return new NfseEntity(nfseProps);
  }

  /**
   * Mapeia a entidade NfseEntity para o formato do response SOAP.
   * @param nfseEntity Entidade de NFS-e.
   * @returns Estrutura do response SOAP.
   */
  static toWS(nfseEntity: NfseEntity): NfseResponse {
    const nfseProps = nfseEntity.props;

    return {
      ConsultarNfsePorRpsResult: {
        CompNfse: {
          Nfse: {
            InfNfse: {
              Numero: nfseProps.number,
              CodigoVerificacao: nfseProps.verificationCode,
              DataEmissao: nfseProps.issueDate,
              IdentificacaoRps: {
                Numero: nfseProps.rpsIdentification.number,
                Serie: nfseProps.rpsIdentification.series,
                Tipo: nfseProps.rpsIdentification.type,
              },
              DataEmissaoRps: nfseProps.rpsIssueDate,
              NaturezaOperacao: nfseProps.operationNature,
              RegimeEspecialTributacao: nfseProps.specialTaxRegime,
              OptanteSimplesNacional: nfseProps.simpleNationalOption,
              IncentivadorCultural: nfseProps.culturalIncentive,
              Competencia: nfseProps.competence,
              NfseSubstituida: nfseProps.replacedNfse,
              Servico: {
                Valores: {
                  ValorServicos: nfseProps.service.values.serviceValue,
                  NumeroDeducao: nfseProps.service.values.deductionNumber,
                  ValorDeducoes: nfseProps.service.values.deductionValue,
                  ValorPis: nfseProps.service.values.pisValue,
                  ValorCofins: nfseProps.service.values.cofinsValue,
                  ValorInss: nfseProps.service.values.inssValue,
                  ValorIr: nfseProps.service.values.irValue,
                  ValorCsll: nfseProps.service.values.csllValue,
                  IssRetido: nfseProps.service.values.withheldIss,
                  ValorIss: nfseProps.service.values.issValue,
                  ValorIssRetido: nfseProps.service.values.withheldIssValue,
                  OutrasRetencoes: nfseProps.service.values.otherRetentions,
                  BaseCalculo: nfseProps.service.values.calculationBase,
                  Aliquota: nfseProps.service.values.rate,
                  ValorLiquidoNfse: nfseProps.service.values.netNfseValue,
                  DescontoIncondicionado:
                    nfseProps.service.values.unconditionalDiscount,
                  DescontoCondicionado:
                    nfseProps.service.values.conditionalDiscount,
                },
                ItemListaServico: nfseProps.service.serviceListItem,
                CodigoCnae: nfseProps.service.cnaeCode,
                CodigoTributacaoMunicipio:
                  nfseProps.service.municipalTaxationCode,
                Discriminacao: nfseProps.service.description,
                CodigoMunicipio: nfseProps.service.municipalityCode,
              },
              ValorCredito: nfseProps.creditValue,
              PrestadorServico: {
                IdentificacaoPrestador: {
                  Cnpj: nfseProps.serviceProvider.providerIdentification.cnpj,
                  InscricaoMunicipal:
                    nfseProps.serviceProvider.providerIdentification
                      .municipalRegistration,
                },
                NomeFantasia: nfseProps.serviceProvider.tradeName,
                Endereco: {
                  Endereco: nfseProps.serviceProvider.address.street,
                  Numero: nfseProps.serviceProvider.address.number,
                  Bairro: nfseProps.serviceProvider.address.neighborhood,
                  CodigoMunicipio:
                    nfseProps.serviceProvider.address.municipalityCode,
                  Uf: nfseProps.serviceProvider.address.state,
                  Cep: nfseProps.serviceProvider.address.zipCode,
                },
              },
              TomadorServico: {
                IdentificacaoTomador: {
                  CpfCnpj: {
                    Cpf: nfseProps.serviceRecipient.recipientIdentification
                      .cpfCnpj.cpf,
                    Cnpj: nfseProps.serviceRecipient.recipientIdentification
                      .cpfCnpj.cnpj,
                  },
                },
                RazaoSocial: nfseProps.serviceRecipient.businessName,
                Endereco: {
                  CodigoMunicipio:
                    nfseProps.serviceRecipient.address.municipalityCode,
                  Cep: nfseProps.serviceRecipient.address.zipCode,
                },
                Contato: nfseProps.serviceRecipient.contact
                  ? {
                      Telefone: nfseProps.serviceRecipient.contact.phone,
                      Email: nfseProps.serviceRecipient.contact.email,
                    }
                  : null,
              },
            },
          },
        },
      },
    };
  }
}
