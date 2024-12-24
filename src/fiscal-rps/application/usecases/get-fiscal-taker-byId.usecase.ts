import { Injectable, Inject } from '@nestjs/common';
import { FiscalTakerRepository } from '@/fiscal-rps/domain/repositories/fiscal-taker.repository';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalTakerAndServiceOutputDto,
  FiscalTakerAndServiceOutputMapper,
} from '../dtos/fiscal-taker-and-service-output-dto';

export type GetTakerByIdInput = {
  id: string;
};

@Injectable()
export class GetTakerByIdUseCase {
  constructor(
    @Inject('FiscalTakerPrismaRepository')
    private readonly fiscalTakerRepository: FiscalTakerRepository,
  ) {}

  async execute(
    input: GetTakerByIdInput,
  ): Promise<FiscalTakerAndServiceOutputDto['taker']> {
    const taker = await this.fiscalTakerRepository.findById(input.id);
    return FiscalTakerAndServiceOutputMapper.toTakerOutput(taker);
  }
}
