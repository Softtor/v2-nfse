import { Injectable } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { CuritibaRepositoryImpl } from '@/nfse/infrastructure/repositories/soap/curitiba-repository-impl';
import { ReceiveBatchRpsInterface } from '../../interfaces/receive-batch-rps.interface';
import { ConsultNfseByRpsInput } from '../../interfaces/consult-nfse-by-rps-input.interface';
import {
  NfsePorLoteResponse,
  NfseResponse,
} from '../../interfaces/nfse.interface';

@Injectable()
export class NfseBatchListener {
  constructor(
    private readonly recepcionarLoteRps: CuritibaRepositoryImpl.RecepcionarLoteRps,
    private readonly consultarNfsePorRps: CuritibaRepositoryImpl.ConsultarNfsePorRps,
    private readonly consultarSituacaoLote: CuritibaRepositoryImpl.ConsultarSituacaoLoteRps,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('fiscal-batch.create')
  async handlerCreateBatchEvent(batch: ReceiveBatchRpsInterface) {
    try {
      // para testar sem gerar a requisição SOAP, acessar o CuritibaRepositoryImpl.RecepcionarLoteRps e descomentar a linha de teste
      const result = await this.recepcionarLoteRps.send(batch);
      console.log('Lote processado com sucesso', result);
      return result;
    } catch (error) {
      console.error('Erro ao processar o lote:', error);
      throw new BadRequestError('Erro ao processar o lote: ' + error);
    }
  }

  @OnEvent('fiscal-nfse.consult')
  async handlerConsultNfseEvent(event: {
    data: ConsultNfseByRpsInput;
    rpsProtocol: string;
  }) {
    try {
      const consultLote: NfsePorLoteResponse =
        await this.consultarSituacaoLote.send({
          Prestador: {
            Cnpj: event.data.cnpj,
            InscricaoMunicipal: event.data.inscricaoMunicipal,
          },
          Protocolo: event.rpsProtocol,
        });

      if (
        consultLote.ConsultarLoteRpsResult &&
        consultLote.ConsultarLoteRpsResult.ListaMensagemRetorno
      ) {
        console.error(
          'Error ao consultar Lote',
          JSON.stringify(consultLote, null, 2),
        );
        throw new BadRequestError(
          'Erro ao consultar Lote: ' + JSON.stringify(consultLote, null, 2),
        );
      }

      console.log('consultLote ok', JSON.stringify(consultLote, null, 2));

      this.eventEmitter.emit('fiscal-nfse.create', consultLote);

      const files = await this.eventEmitter.emitAsync(
        'send-email.convert-files',
        {
          rps: consultLote,
        },
      );

      const number =
        consultLote.ConsultarLoteRpsResult.ListaNfse.CompNfse.tcCompNfse[0].Nfse
          .InfNfse.Numero;
      const pdf = files[0].pdf;
      const xml = files[0].xml;

      this.eventEmitter.emit('generate-nfse-archives', { number, pdf, xml });
      return;
    } catch (error) {
      console.error('Erro ao consultar NFSe:', error);
      throw new BadRequestError('Erro ao consultar NFSe: ' + error);
    }
  }
}
