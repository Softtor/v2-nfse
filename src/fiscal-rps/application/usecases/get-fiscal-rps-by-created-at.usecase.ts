import { Injectable, Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { RpsInterface } from '@/nfse/domain/interfaces/common/rps.interface';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  RpsMapper,
  WsRps,
} from '@/nfse/infrastructure/repositories/soap/mappers/rps.mapper';
import { RpsEntity } from '@/nfse/domain/entities/rps.entity';
import { FiscalNfConfigOutputDto } from '@/fiscal-nf-config/application/dto/fiscal-nf-config-output.dto';
import { FiscalTakerAndServiceOutputDto } from '../dtos/fiscal-taker-and-service-output-dto';

@Injectable()
export class FindFiscalRpsByCreatedAtUseCase {
  constructor(
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(createdAt: Date): Promise<any> {
    const rpsList = await this.fiscalRpsRepository.findAllByCreated(createdAt);

    if (!rpsList || rpsList.length === 0) {
      console.warn('No RPS found for the specified date.');
      return [];
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
        serviceTaker: {
          cpf:
            relatedData.taker.document.length === 11
              ? relatedData.taker.document
              : undefined,
          cnpj:
            relatedData.taker.document.length === 14
              ? relatedData.taker.document
              : undefined,
          businessName: relatedData.taker.name,
          address: {
            address: relatedData.taker.address,
            number: relatedData.taker.number,
            complement: relatedData.taker.complement,
            neighborhood: relatedData.taker.neighborhood,
            municipalityCode: relatedData.taker.cityCode,
            state: relatedData.taker.state,
            postalCode: relatedData.taker.zipCode,
          },
          email: relatedData.taker.email,
          phone: relatedData.taker.phone,
        },
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
    return {
      data: rps,
      providerId: rpsList[0].providerId,
      rpsId: rpsList[0].id,
    };
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
        taker: taker[0] as FiscalTakerAndServiceOutputDto['taker'],
        nfConfig: nfConfig[0] as FiscalNfConfigOutputDto,
      },
    };
  }
}
