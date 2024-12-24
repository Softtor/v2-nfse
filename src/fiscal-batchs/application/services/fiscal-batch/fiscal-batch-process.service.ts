import { Injectable, Inject } from '@nestjs/common';
import { FiscalBatchNfseRepository } from '@/fiscal-batchs/domain/repositories/fiscal-bach.repository';
import { FiscalBatchNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-bach.entity';

@Injectable()
export class BatchProcessService {
  constructor(
    @Inject('FiscalBatchPrismaRepository')
    private readonly fiscalBatchRepository: FiscalBatchNfseRepository,
  ) {}

  async createBatch(providerId: string): Promise<FiscalBatchNfseEntity> {
    const batch = new FiscalBatchNfseEntity({
      sentAt: new Date(),
      providerId,
      confirmedSentWs: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.fiscalBatchRepository.save(batch);
  }

  async getUnconfirmedBatches(): Promise<FiscalBatchNfseEntity[]> {
    return this.fiscalBatchRepository.findUnconfirmedBatches();
  }
}
