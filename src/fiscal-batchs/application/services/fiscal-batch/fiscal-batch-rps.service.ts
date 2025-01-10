import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { WsRps } from '@/nfse/infrastructure/repositories/soap/mappers/rps.mapper';

@Injectable()
export class BatchRpsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async getPendingRps(): Promise<{
    data: WsRps[];
    providerId: string;
    rpsId: string;
  }> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const now = new Date(); // to test

    const rpsArray = await this.eventEmitter.emitAsync(
      'fiscal-rps.findAllByCreatedAt',
      sevenDaysAgo,
    );
    const flattenedRps = rpsArray[0];
    console.log('flattenedRps', flattenedRps);
    return flattenedRps;
  }

  async updateRpsBatchAssociations(
    rpsArray: WsRps[],
    batchId: string,
    sentAt: Date,
  ): Promise<void> {
    for (const rps of rpsArray) {
      const [rpsData] = await this.eventEmitter.emitAsync(
        'fiscal-rps.get.byNumber',
        rps.Rps.InfRps.IdentificacaoRps.Numero,
      );
      const updateDto = {
        id: rpsData.id,
        batchId: batchId,
        issueDateRps: sentAt,
        confirmedSentWs: true,
      };
      await this.eventEmitter.emitAsync('fiscal-rps.update', updateDto);
    }
  }

  async updateRpsBatchIdAssociations(
    rpsArray: WsRps[],
    batchId: string,
  ): Promise<void> {
    for (const rps of rpsArray) {
      const [rpsData] = await this.eventEmitter.emitAsync(
        'fiscal-rps.get.byNumber',
        rps.Rps.InfRps.IdentificacaoRps.Numero,
      );
      const updateDto = {
        id: rpsData.id,
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
