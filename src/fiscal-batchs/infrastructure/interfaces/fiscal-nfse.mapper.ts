import { CreateFiscalNfseDTO } from '@/fiscal-batchs/application/dtos/fiscal-nfse-input.dto';
import { NfsePorLoteResponse } from '@/nfse/domain/interfaces/nfse.interface';

export class FiscalNfseMapper {
  static toCreateDto(response: NfsePorLoteResponse): CreateFiscalNfseDTO[] {
    const nfseArray =
      response.ConsultarLoteRpsResult.ListaNfse.CompNfse.tcCompNfse;

    if (!nfseArray || nfseArray.length === 0) {
      throw new Error('NFSe data is missing in the response');
    }

    return nfseArray.map((nfseItem) => {
      const nfseData = nfseItem.Nfse.InfNfse;

      return {
        number: Number(nfseData.Numero),
        verificationCode: nfseData.CodigoVerificacao,
        issueDate: new Date(nfseData.DataEmissao),
        rpsNumber: nfseData.IdentificacaoRps.Numero,
        rpsIssueDate: new Date(nfseData.DataEmissaoRps),
        competence: new Date(nfseData.Competencia),
        sentAt: undefined,
      };
    });
  }
}
