import { Injectable, Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  FiscalRpsOutputDto,
  FiscalRpsOutputMapper,
} from '../dtos/fiscal-rps-output.dto';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';

export type CreateFiscalRpsInput = {
  externalPlanCode: string;
  takerDocument: string;
  paymentId: string;
};

@Injectable()
export class CreateFiscalRpsUseCase {
  constructor(
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(input: CreateFiscalRpsInput): Promise<FiscalRpsOutputDto> {
    const { provider, nfConfig, taker, service } =
      await this.fetchDependencies(input);
    const paymentId = input.paymentId;
    const fiscalRpsEntity = this.createFiscalRpsEntity(
      nfConfig,
      provider,
      taker,
      service,
      paymentId,
    );

    await this.fiscalRpsRepository.save(fiscalRpsEntity);

    await this.emitUpdateFiscalNfConfigEvent(nfConfig);

    return FiscalRpsOutputMapper.toOutput(fiscalRpsEntity);
  }

  private async fetchDependencies(input: CreateFiscalRpsInput) {
    const { externalPlanCode, takerDocument } = input;

    const [provider, nfConfig, taker, service] = await Promise.all([
      this.eventEmitter.emitAsync('fiscal-provider.get', { id: 1 }),
      this.eventEmitter.emitAsync('fiscal-nf-config.get', 1),
      this.eventEmitter.emitAsync('fiscal-taker.get', takerDocument),
      this.eventEmitter.emitAsync('fiscal-service.get', externalPlanCode),
    ]);

    if (!provider[0] || !nfConfig[0] || !taker[0] || !service[0]) {
      throw new BadRequestError(
        'Failed to retrieve required data for Fiscal RPS creation.',
      );
    }

    return {
      provider: provider[0],
      nfConfig: nfConfig[0],
      taker: taker[0],
      service: service[0],
    };
  }

  private createFiscalRpsEntity(
    nfConfig: any,
    provider: any,
    taker: any,
    service: any,
    paymentId: any,
  ): FiscalRpsEntity {
    return new FiscalRpsEntity({
      number: nfConfig.nextDocumentNumber,
      series: nfConfig.serie,
      issueDateRps: null,
      type: '1',
      status: '1',
      competence: new Date(),
      complementaryInformation: 'Nao informado',
      serviceId: service.id,
      takerId: taker.id,
      providerId: provider.id,
      batchId: null,
      paymentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private async emitUpdateFiscalNfConfigEvent(nfConfig: any): Promise<void> {
    const updatedInput = {
      id: nfConfig.id,
      nextDocumentNumber: nfConfig.nextDocumentNumber + 1,
    };

    await this.eventEmitter.emitAsync('fiscal-nf-config.update', updatedInput);
  }
}
