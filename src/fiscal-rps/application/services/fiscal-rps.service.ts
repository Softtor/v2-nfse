import { Injectable, Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import {
  CreateFiscalRpsDTO,
  RpsDTO,
  UpdateFiscalRpsDTO,
} from '../dtos/fiscal-data-input.dto';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import {
  FiscalRpsOutputDto,
  FiscalRpsOutputMapper,
} from '../dtos/fiscal-rps-output.dto';

@Injectable()
export class FiscalRpsService {
  constructor(
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository,
  ) {}

  async create(dto: RpsDTO): Promise<FiscalRpsOutputDto> {
    const fiscalRpsEntity = this.createEntity(dto);
    await this.fiscalRpsRepository.save(fiscalRpsEntity);
    return this.mapToOutput(fiscalRpsEntity);
  }

  async update(dto: UpdateFiscalRpsDTO): Promise<FiscalRpsOutputDto> {
    const existingRps = await this.fiscalRpsRepository.findById(dto.id);
    if (!existingRps) {
      throw new Error(`FiscalRps with ID ${dto.id} not found`);
    }

    const updatedRps = this.updateEntity(existingRps, dto);
    await this.fiscalRpsRepository.update(updatedRps);
    return this.mapToOutput(updatedRps);
  }

  async findAllByCreatedAt(createdAt: Date): Promise<FiscalRpsOutputDto[]> {
    console.log('findAllByCreatedAt - Searching RPS for Date:', createdAt);
    const rpsList = await this.fiscalRpsRepository.findAllByCreated(createdAt);
    console.log('findAllByCreatedAt - RPS Found:', rpsList);
    return rpsList.map(FiscalRpsOutputMapper.toOutput);
  }

  private createEntity(dto: RpsDTO): FiscalRpsEntity {
    return new FiscalRpsEntity({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private updateEntity(
    entity: FiscalRpsEntity,
    dto: UpdateFiscalRpsDTO,
  ): FiscalRpsEntity {
    entity.update({
      batchId: dto.batchId ?? entity.batchId,
      issueDateRps: dto.issueDateRps ?? entity.issueDateRps,
      updatedAt: new Date(),
    });

    return entity;
  }

  private mapToOutput(entity: FiscalRpsEntity): FiscalRpsOutputDto {
    return FiscalRpsOutputMapper.toOutput(entity);
  }
}
