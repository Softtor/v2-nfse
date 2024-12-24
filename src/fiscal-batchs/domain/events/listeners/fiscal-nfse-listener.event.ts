import { CreateFiscalNfseDTO } from '@/fiscal-batchs/application/dtos/fiscal-nfse-input.dto';
import { RetryFailedConsultationService } from '@/fiscal-batchs/application/services/fiscal-nfse/fiscal-nfse-retry-consult.service';
import { FiscalNfseService } from '@/fiscal-batchs/application/services/fiscal-nfse/fiscal-nfse.service';
import { FiscalNfseMapper } from '@/fiscal-batchs/infrastructure/interfaces/fiscal-nfse.mapper';
import { NfseResponse } from '@/nfse/domain/interfaces/nfse.interface';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FiscalNfseListener {
  constructor(
    private readonly fiscalNfseService: FiscalNfseService,
    private readonly fiscalNfseRetry: RetryFailedConsultationService,
  ) {}

  @OnEvent('fiscal-nfse.create')
  async handleFiscalNfseCreateEvent(dto: NfseResponse) {
    const nfse = await this.fiscalNfseService.create(dto);
    return nfse;
  }

  @OnEvent('fiscal-nfse.retry')
  async handleFiscalNfseRetryEvent() {
    console.log('Reprocessando consultas falhadas manualmente...');
    await this.fiscalNfseRetry.retryFailedConsultations();
  }
}
