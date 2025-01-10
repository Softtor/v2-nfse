import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

@Injectable()
export class BatchRpsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async getPendingRps(): Promise<any[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const now = new Date(); // to test

    const rpsArray = await this.eventEmitter.emitAsync(
      'fiscal-rps.findAllByCreatedAt',
      now,
    );
    const flattenedRps = rpsArray[0].flat();

    return flattenedRps;
  }

  async updateRpsBatchAssociations(
    rpsArray: any[],
    batchId: string,
    sentAt: Date,
  ): Promise<void> {
    for (const rps of rpsArray) {
      const updateDto = {
        id: rps.rpsId,
        batchId: batchId,
        issueDateRps: sentAt,
        confirmedSentWs: true,
      };

      await this.eventEmitter.emitAsync('fiscal-rps.update', updateDto);
    }
  }

  async updateRpsBatchIdAssociations(
    rpsArray: any[],
    batchId: string,
  ): Promise<void> {
    for (const rps of rpsArray) {
      const updateDto = {
        id: rps.rpsId,
        batchId: batchId,
      };
      await this.eventEmitter.emitAsync('fiscal-rps.update', updateDto);
    }
  }

  async getRpsByBatchId(batchId: string): Promise<any[]> {
    const rpsArray = await this.eventEmitter.emitAsync('fiscal-rps.findAll', {
      batchId,
    });
    const flattenedRps = rpsArray[0].flat();
    if (flattenedRps.length === 0) {
      throw new NotFoundError(`Nenhum RPS encontrado para o lote: ${batchId}`);
    }

    return flattenedRps;
  }
}
