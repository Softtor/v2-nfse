import { Injectable, Inject } from '@nestjs/common';
import { FiscalNfseRepository } from '@/fiscal-batchs/domain/repositories/fiscal-nfse.repository';
import { FiscalNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-nfse.entity';
import { CreateFiscalNfseDTO } from '../../dtos/fiscal-nfse-input.dto';
import {
  FiscalNfseOutputDto,
  FiscalNfseOutputMapper,
} from '../../dtos/fiscal-nfse-output.dto';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NfseResponse } from '@/nfse/domain/interfaces/nfse.interface';
import { FiscalNfseMapper } from '@/fiscal-batchs/infrastructure/interfaces/fiscal-nfse.mapper';

@Injectable()
export class FiscalNfseService {
  constructor(
    @Inject('FiscalNfsePrismaRepository')
    private readonly fiscalNfseRepository: FiscalNfseRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: NfseResponse): Promise<FiscalNfseOutputDto> {
    const data = FiscalNfseMapper.toCreateDto(dto);
    const rpsData = await this.getRpsData(data.rpsNumber);
    const completeDto = {
      ...data,
      rpsId: rpsData.id,
      providerId: rpsData.providerId,
      takerId: rpsData.takerId,
    };

    const nfseEntity = this.createEntity(completeDto);
    await this.fiscalNfseRepository.save(nfseEntity);
    const taker = await this.eventEmitter.emitAsync(
      'fiscal-taker.get.takerId',
      rpsData.takerId,
    );
    await this.eventEmitter.emitAsync('send-email.fiscal-note', {
      email: taker[0].email,
      takerName: taker[0].name,
      rps: dto,
    });
    return FiscalNfseOutputMapper.toOutput(nfseEntity);
  }

  async getByRps(rpsId: string): Promise<FiscalNfseOutputDto | null> {
    const nfseEntity = await this.fiscalNfseRepository.findByRpsId(rpsId);
    if (!nfseEntity) {
      throw new NotFoundError(`NFS-e not found for RPS ID: ${rpsId}`);
    }
    return FiscalNfseOutputMapper.toOutput(nfseEntity);
  }

  async getByTaker(takerId: string): Promise<FiscalNfseOutputDto[]> {
    const nfseEntities = await this.fiscalNfseRepository.findByTakerId(takerId);
    return nfseEntities.map(FiscalNfseOutputMapper.toOutput);
  }

  private createEntity(
    dto: CreateFiscalNfseDTO & {
      rpsId: string;
      providerId?: string;
      takerId?: string;
    },
  ): FiscalNfseEntity {
    return new FiscalNfseEntity({
      ...dto,
      createdAt: new Date(),
    });
  }

  private getRpsData = async (rpsNumber: string) => {
    const event = await this.eventEmitter.emitAsync(
      'fiscal-rps.get.byNumber',
      rpsNumber,
    );
    return event[0];
  };
}
