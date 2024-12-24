import { Injectable } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { CuritibaRepositoryImpl } from '@/nfse/infrastructure/repositories/soap/curitiba-repository-impl';
import { ReceiveBatchRpsInterface } from '../../interfaces/receive-batch-rps.interface';
import { ConsultNfseByRpsInput } from '../../interfaces/consult-nfse-by-rps-input.interface';

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
      // para testar sem gerar a requisição SOAP, acessar o CuritibaRepositoryImpl.ConsultarNfsePorRps e descomentar a linha de teste
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
      const result = await this.consultarNfsePorRps.consultarNfsePorRps(data);

      console.log('NFSe processada com sucesso', result);

      this.eventEmitter.emit('fiscal-nfse.create', result);

      return result;
    } catch (error) {
      console.error('Erro ao consultar NFSe:', error);
      throw new BadRequestError('Erro ao consultar NFSe: ' + error);
    }
  }
}
