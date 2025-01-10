import { Injectable, Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { RpsInterface } from '@/nfse/domain/interfaces/common/rps.interface';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RpsEntity } from '@/nfse/domain/entities/rps.entity';
import { RpsMapper } from '@/nfse/infrastructure/repositories/soap/mappers/rps.mapper';
import { FiscalNfConfigOutputDto } from '@/fiscal-nf-config/application/dto/fiscal-nf-config-output.dto';

@Injectable()
export class FindAllFiscalRpsUseCase {
  constructor(
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(batchId: string): Promise<any> {
    const rpsList = await this.fiscalRpsRepository.findAll(batchId);
    console.log('rpsList', rpsList);
    if (!rpsList || rpsList.length === 0) {
      throw new BadRequestError('Nenhum RPS encontrado.');
    }

    const dataList = await Promise.all(
      rpsList.map((rps) => this.fetchRelatedData(rps)),
    );

    const rps = rpsList.map((rpsEntity, index) => {
      const relatedData = dataList[index].data;

      const rpsProps = {
        identification: {
          number: rpsEntity.number.toString(),
          series: rpsEntity.series,
          type: rpsEntity.type,
        },
        emissionDate: rpsEntity.issueDateRps?.toISOString() ?? '',
        status: rpsEntity.status,
        service: relatedData.service,
        provider: relatedData.provider,
        serviceTaker: relatedData.taker,
        competence: rpsEntity.competence?.toISOString() ?? '',
        specialTaxRegime: relatedData.nfConfig.taxationRegime || '1',
        simpleNationalOptant: (relatedData.nfConfig.simpleNational
          ? '1'
          : '2') as '1' | '2',
        fiscalIncentive: (relatedData.nfConfig.fiscalIncentive ? '1' : '2') as
          | '1'
          | '2',
        additionalInformation: rpsEntity.complementaryInformation || '',
        culturalIncentive: (relatedData.nfConfig.culturalIncentive
          ? '1'
          : '2') as '1' | '2',
        natureOperation: relatedData.nfConfig.operationNature ?? '1',
      };

      const rpsMappedEntity = new RpsEntity(rpsProps);
      const rpsMapper = new RpsMapper(rpsMappedEntity);

      return rpsMapper.toWS();
    });
    return { data: rps, providerId: rpsList[0].providerId };
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
      data: {
        service: service[0],
        provider: provider[0],
        taker: taker[0],
        nfConfig: nfConfig[0] as FiscalNfConfigOutputDto,
      },
    };
  }
}
