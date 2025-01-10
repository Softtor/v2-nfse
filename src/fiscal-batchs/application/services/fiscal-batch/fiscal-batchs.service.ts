import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BatchMapper } from '@/fiscal-batchs/infrastructure/interfaces/fiscal-batch-output-to-soap.mapper';
import { BatchRpsService } from './fiscal-batch-rps.service';
import { BatchProcessService } from './fiscal-batch-process.service';
import { BatchProviderService } from './fiscal-batch-provider.service';
import { BatchNotProcessService } from './fiscal-betch-not-process.service';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { FiscalBatchNfseEntity } from '../../../domain/entities/fiscal-bach.entity';

interface ProviderData {
  id: string;
}

@Injectable()
export class FiscalBatchService {
  constructor(
    private readonly rpsService: BatchRpsService,
    private readonly batchService: BatchProcessService,
    private readonly providerService: BatchProviderService,
    private readonly batchNotProcessService: BatchNotProcessService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleBatchProcessing(): Promise<void> {
    try {
      await this.processUnconfirmedBatches();
      await this.createAndProcessNewBatch();
    } catch (error) {
      console.error('Erro durante o processamento de lotes:', error.message);
    }
  }

  private async processUnconfirmedBatches(): Promise<void> {
    const unconfirmedBatches = await this.batchService.getUnconfirmedBatches();

    for (const batch of unconfirmedBatches) {
      console.log(`Processando lote não confirmado: ${batch.id}`);
      const rpsArray = await this.rpsService.getRpsByBatchId(batch.id);
      const providerSoap = await this.providerService.fetchProviderData(
        batch.providerId,
      );
      const batchSoap = this.prepareBatchSoap(
        batch.name,
        rpsArray,
        providerSoap,
      );
      await this.batchNotProcessService.processBatch(batch, batchSoap);
    }

    console.log('Lotes não confirmados processados com sucesso.');
  }

  private async createAndProcessNewBatch(): Promise<void> {
    const rpsArray = await this.rpsService.getPendingRps();
    if (rpsArray.length === 0) return;

    const newBatch = await this.batchService.createBatch(
      rpsArray[0].providerId,
    );
    await this.rpsService.updateRpsBatchIdAssociations(rpsArray, newBatch.id);

    const providerSoap = await this.providerService.fetchProviderData(
      rpsArray[0].providerId,
    );
    const batchSoap = this.prepareBatchSoap(
      newBatch.name,
      rpsArray,
      providerSoap,
    );

    const createdBatch = await this.batchNotProcessService.processBatch(
      newBatch,
      batchSoap,
    );
    await this.rpsService.updateRpsBatchAssociations(
      rpsArray,
      newBatch.id,
      newBatch.sentAt,
    );
    console.log('Novo lote criado e processado com sucesso.');
    console.log('Consultando eventos de lote...');
    setTimeout(() => {
      this.emitConsultEvents(rpsArray, createdBatch);
    }, 60000);
  }

  private prepareBatchSoap(
    batchNumber: string,
    rpsArray: any[],
    providerSoap: any,
  ): any {
    return BatchMapper.toSoapFormat(
      batchNumber,
      rpsArray.map(({ rpsId, providerId, ...rest }) => rest),
      providerSoap,
    );
  }

  private emitConsultEvents(
    rpsArray: any[],
    createdBatch: FiscalBatchNfseEntity,
  ): void {
    for (const rps of rpsArray) {
      const consultData = {
        Prestador: {
          Cnpjs: rps.Rps.InfRps.Prestador.Cnpj,
          InscricaoMunicipal: rps.Rps.InfRps.Prestador.InscricaoMunicipal,
        },
        Protocolo: createdBatch.protocol,
      };
      try {
        this.eventEmitter.emit('fiscal-nfse.consult', consultData);
        console.log('Evento fiscal-nfse.consult disparado:', consultData);
      } catch (error) {
        console.error(
          'Erro ao processar consulta NFSe:',
          consultData,
          error.message,
        );
        this.eventEmitter.emit('fiscal-nfse.retry', consultData);
        console.log(
          'Evento fiscal-nfse.retry disparado para reprocessamento:',
          consultData,
        );
      }
    }
  }
}
