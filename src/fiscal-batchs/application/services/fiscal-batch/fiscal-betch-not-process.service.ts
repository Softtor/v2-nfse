import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FiscalBatchNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-bach.entity';
import { FiscalBatchNfseRepository } from '@/fiscal-batchs/domain/repositories/fiscal-bach.repository';

@Injectable()
export class BatchNotProcessService {
  constructor(
    @Inject('FiscalBatchPrismaRepository')
    private readonly fiscalBatchRepository: FiscalBatchNfseRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async processBatch(
    batch: FiscalBatchNfseEntity,
    batchSoap: any,
  ): Promise<boolean> {
    try {
      const response = await this.eventEmitter.emitAsync(
        'fiscal-batch.create',
        {
          LoteRps: batchSoap,
        },
      );
      const result = response[0];
      console.log('Resultado do processamento do lote:', result);
      batch.update({
        protocol: result.protocol,
        receiptDate: result.message,
        batchNumber: result.batchnumber,
        confirmedSentWs: true,
      });
      console.log(batch);
      await this.fiscalBatchRepository.update(batch);

      console.log('Lote processado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao processar o lote: ', error);

      batch.update({
        confirmedSentWs: false,
      });
      await this.fiscalBatchRepository.update(batch);

      return false;
    }
  }
}
