import { Injectable, Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { RpsInterface } from '@/nfse/domain/interfaces/common/rps.interface';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RpsMapper } from '@/fiscal-rps/infrastructure/interfaces/fiscal-rps-soap.mapper';

@Injectable()
export class FindFiscalRpsByCreatedAtUseCase {
  constructor(
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(createdAt: Date): Promise<RpsInterface[]> {
    const rpsList = await this.fiscalRpsRepository.findAllByCreated(createdAt);

    if (!rpsList || rpsList.length === 0) {
      console.warn('No RPS found for the specified date.');
    }

    const detailedRpsList = await Promise.all(
      rpsList.map((rps) => this.fetchRelatedData(rps)),
    );

    return detailedRpsList.map(RpsMapper.toSoapFormat);
  }

  private async fetchRelatedData(rps: any) {
    const [service, provider, taker] = await Promise.all([
      this.eventEmitter.emitAsync(
        'fiscal-service.get.serviceId',
        rps.serviceId,
      ),
      this.eventEmitter.emitAsync('fiscal-provider.get.providerId', {
        id: rps.providerId,
      }),
      this.eventEmitter.emitAsync('fiscal-taker.get.takerId', rps.takerId),
    ]);
    const nfConfig = await this.eventEmitter.emitAsync(
      'fiscal-nf-config.get',
      provider[0].emitterId,
    );

    return {
      rpsId: rps.id,
      providerId: rps.providerId,
      loteRps: {
        ...rps,
        service: service[0],
        provider: provider[0],
        taker: taker[0],
        nfConfig: nfConfig[0],
      },
    };
  }
}
