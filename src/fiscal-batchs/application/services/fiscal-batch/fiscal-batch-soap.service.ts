import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BatchSoapService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async sendBatch(batch: any, batchSoap: any): Promise<any> {
    const response = await this.eventEmitter.emitAsync('fiscal-batch.create', {
      batch: batch,
      batchSoap: batchSoap,
    });

    if (!response || response.length === 0 || !response[0]) {
      throw new Error('Nenhuma resposta válida recebida ao enviar o lote.');
    }

    return response[0];
  }
}
