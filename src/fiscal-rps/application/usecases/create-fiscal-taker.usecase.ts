import { Injectable, Inject } from '@nestjs/common';
import { FiscalTakerRepository } from '@/fiscal-rps/domain/repositories/fiscal-taker.repository';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { CreateFiscalRpsDTO } from '../dtos/fiscal-data-input.dto';

@Injectable()
export class CreateFiscalTakerUseCase {
  constructor(
    @Inject('FiscalTakerPrismaRepository')
    private readonly fiscalTakerRepository: FiscalTakerRepository,
  ) {}

  async execute(
    takerData: CreateFiscalRpsDTO['taker'],
  ): Promise<FiscalTakerEntity> {
    const takerEntity = new FiscalTakerEntity({
      ...takerData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (await this.fiscalTakerRepository.documentExists(takerEntity.document)) {
      await this.fiscalTakerRepository.updateByDocument(
        takerEntity.document,
        takerEntity,
      );
      return takerEntity;
    }
    await this.fiscalTakerRepository.save(takerEntity);
    return takerEntity;
  }
}
