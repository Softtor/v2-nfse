import { Injectable, Inject } from '@nestjs/common';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import {
  FiscalTakerAndServiceOutputDto,
  FiscalTakerAndServiceOutputMapper,
} from '../dtos/fiscal-taker-and-service-output-dto';

export type GetServiceByIdInput = {
  id: string;
};

@Injectable()
export class GetServiceByIdUseCase {
  constructor(
    @Inject('FiscalServicePrismaRepository')
    private readonly fiscalServiceRepository: FiscalServiceRepository,
  ) {}

  async execute(
    input: GetServiceByIdInput,
  ): Promise<FiscalTakerAndServiceOutputDto['service']> {
    const service = await this.fiscalServiceRepository.findById(input.id);
    return FiscalTakerAndServiceOutputMapper.toServiceOutput(service);
  }
}
