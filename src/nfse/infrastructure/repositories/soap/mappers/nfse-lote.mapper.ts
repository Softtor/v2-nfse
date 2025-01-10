import { NfseEntity } from '@/nfse/domain/entities/nfse.entity';
import {
  NfseProps,
  NfsePorLoteResponse,
} from '@/nfse/domain/interfaces/nfse.interface';

export class NfseLoteMapper {
  /**
   * Mapeia os dados de NfsePorLoteResponse para uma entidade NfseEntity.
   * @param nfseResponse Resposta do serviço SOAP.
   * @returns Instância da entidade NfseEntity.
   */
  static fromWS(nfseResponse: NfsePorLoteResponse): NfseEntity {
    const nfseArray =
      nfseResponse.ConsultarLoteRpsResult.ListaNfse.CompNfse.tcCompNfse;

    if (!nfseArray || nfseArray.length === 0) {
      throw new Error('NFSe data is missing in the response');
    }

    const infNfse = nfseArray[0].Nfse.InfNfse;

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
          withheldIss: infNfse.Servico.Valores.IssRetido === '1' ? 1 : 2,
          issValue: infNfse.Servico.Valores.ValorIss || 0,
          withheldIssValue: infNfse.Servico.Valores.ValorIssRetido.toString(),
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
}
