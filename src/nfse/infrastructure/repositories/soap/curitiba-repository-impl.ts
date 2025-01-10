import { ConsultNfseByRpsInput } from '../../../domain/interfaces/consult-nfse-by-rps-input.interface';
import { Injectable } from '@nestjs/common';
import { ConsultNfseInput } from '@/nfse/domain/interfaces/consult-nfse.interface';
import { SoapAbstractRepository } from '@/shared/domain/soap/repository/soap.repository';
import { ReceiveBatchRpsInterface } from '@/nfse/domain/interfaces/receive-batch-rps.interface';
import { ReturnReceiveBatchRps } from '@/nfse/domain/interfaces/common/response.interface';
import { ConsultBatchSituationInterface } from '@/nfse/domain/interfaces/consult-batch-situation.interface';
import { NfseResponse } from '@/nfse/domain/interfaces/nfse.interface';
import { SoapRequestError } from '@/shared/domain/errors/soap-errors';
import { CancelNfseOutput } from '@/nfse/domain/interfaces/cancel-nfse.interface';

export namespace CuritibaRepositoryImpl {
  @Injectable()
  export class ConsultarNfsePorRps extends SoapAbstractRepository {
    private response: NfseResponse = null;

    async consultarNfsePorRps(data: ConsultNfseByRpsInput): Promise<this> {
      const args = {
        ConsultarNfseRpsEnvio: {
          IdentificacaoRps: {
            Numero: data.numero,
            Serie: data.serie,
            Tipo: data.tipo,
          },
          Prestador: {
            Cnpj: data.cnpj,
            InscricaoMunicipal: data.inscricaoMunicipal,
          },
        },
      };

      const response = await this.execute('ConsultarNfsePorRps', args);

      this.response = response as NfseResponse;
      return this;
    }

    getResponse(): {
      protocol: NfseResponse | null;
      message: string;
    } {
      if (this.response?.ConsultarNfsePorRpsResult?.ListaMensagemRetorno) {
        handleError({
          ListaMensagemRetorno:
            this.response.ConsultarNfsePorRpsResult.ListaMensagemRetorno,
        });
        return {
          protocol: null,
          message: 'Erro na consulta: Mensagens de retorno encontradas.',
        };
      }

      const nfseResult = this.response?.ConsultarNfsePorRpsResult;
      if (!nfseResult) {
        throw new Error('Estrutura de dados da NFS-e inválida');
      }

      return {
        protocol: this.response || null,
        message:
          nfseResult.CompNfse.Nfse.InfNfse.DataEmissao ||
          'Data de recebimento não encontrada',
      };
    }
  }

  @Injectable()
  export class ConsultarNfse extends SoapAbstractRepository {
    async consultarNfse(data: ConsultNfseInput): Promise<any> {
      const args = {
        prestador: {
          cnpj: data.prestador.cnpj,
          inscricaoMunicipal: data.prestador.inscricaoMunicipal,
        },
        numeroNfse: data.numeroNfse,
        periodoEmissao: data.periodoEmissao,
        tomador: data.tomador,
        intermediarioServico: data.intermediarioServico,
      };

      return this.execute('ConsultarNfse', args);
    }
  }

  @Injectable()
  export class CancelarNfse extends SoapAbstractRepository {
    async cancelarNfse(data): Promise<CancelNfseOutput> {
      return this.execute('CancelarNfse', data);
    }
  }

  @Injectable()
  export class RecepcionarLoteRps extends SoapAbstractRepository {
    private response: ReturnReceiveBatchRps;

    async send(data: ReceiveBatchRpsInterface): Promise<{
      protocol: string;
      message: string;
      batchnumber: string;
    }> {
      try {
        const response: any = await this.execute('RecepcionarLoteRps', {
          EnviarLoteRpsEnvio: {
            ...data,
          },
        });

        if (!response.ok) {
          this.getResponse(response);
        }

        // const response = {
        //   ok: true,
        //   RecepcionarLoteRpsResult: {
        //     Protocolo: '123456789',
        //     DataRecebimento: new Date().toISOString(),
        //     NumeroLote: data.LoteRps.NumeroLote,
        //   },
        // }; //to test
        return this.getResponse(response);
      } catch (error) {
        console.log(error, 'error');
        console.log('Error:', error);
      }
    }

    getResponse(response: any): {
      protocol: string;
      message: string;
      batchnumber: string;
    } {
      if (response.RecepcionarLoteRpsResult.ListaMensagemRetorno) {
        handleError(response.RecepcionarLoteRpsResult);
        return;
      }
      return {
        protocol: response.RecepcionarLoteRpsResult.Protocolo,
        message: response.RecepcionarLoteRpsResult.DataRecebimento,
        batchnumber: response.RecepcionarLoteRpsResult.NumeroLote,
      };
    }
  }
  //638720679483537739
  @Injectable()
  export class ConsultarSituacaoLoteRps extends SoapAbstractRepository {
    async send(data: ConsultBatchSituationInterface): Promise<any> {
      return this.execute('ConsultarLoteRps', {
        ConsultarLoteRpsEnvio: {
          ...data,
        },
      });
    }
  }

  function handleError(error: {
    ListaMensagemRetorno?: {
      MensagemRetorno: {
        Mensagem: string;
        Codigo: string;
        Correcao: string;
      }[];
    };
  }): void {
    if (error.ListaMensagemRetorno) {
      const errors = error.ListaMensagemRetorno.MensagemRetorno.map(
        (message) => {
          return (
            'Mensagem: ' +
            message.Mensagem +
            '\n Código: ' +
            message.Codigo +
            '\n Correção: ' +
            message.Correcao
          );
        },
      );
      const errorsString = errors.join('\n');
      throw new SoapRequestError(errorsString);
    }
  }
}
