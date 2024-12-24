import { Injectable } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { CuritibaRepositoryImpl } from '@/nfse/infrastructure/repositories/soap/curitiba-repository-impl';
import { ReceiveBatchRpsInterface } from '../../interfaces/receive-batch-rps.interface';
import { ConsultNfseByRpsInput } from '../../interfaces/consult-nfse-by-rps-input.interface';
import { NfseResponse } from '../../interfaces/nfse.interface';

@Injectable()
export class NfseBatchListener {
  constructor(
    private readonly recepcionarLoteRps: CuritibaRepositoryImpl.RecepcionarLoteRps,
    private readonly consultarNfsePorRps: CuritibaRepositoryImpl.ConsultarNfsePorRps,
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
  async handlerConsultNfseEvent(data: ConsultNfseByRpsInput) {
    try {
      //para teste, comentar a linha abaixo e adicionar um mock de retorno
      const result = (await this.consultarNfsePorRps.consultarNfsePorRps(
        data,
      )) as unknown as NfseResponse;

      console.log('NFSe processada com sucesso', result);

      this.eventEmitter.emit('fiscal-nfse.create', result);

      const files = await this.eventEmitter.emitAsync(
        'send-email.convert-files',
        {
          rps: result,
        },
      );
      const number =
        result.ConsultarNfsePorRpsResult.CompNfse.Nfse.InfNfse.Numero;
      const pdf = files[0].pdf;
      const xml = files[0].xml;

      this.eventEmitter.emit('generate-nfse-archives', { number, pdf, xml });
      return result;
    } catch (error) {
      console.error('Erro ao consultar NFSe:', error);
      throw new BadRequestError('Erro ao consultar NFSe: ' + error);
    }
  }
}
