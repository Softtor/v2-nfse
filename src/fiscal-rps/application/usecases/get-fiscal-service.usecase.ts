import { Injectable, Inject } from '@nestjs/common';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';

export type GetServiceInput = {
  externalPlanCode: string;
};

@Injectable()
export class GetServiceUseCase {
  constructor(
    @Inject('FiscalServicePrismaRepository')
    private readonly fiscalServiceRepository: FiscalServiceRepository,
  ) {}

  async execute(input: GetServiceInput): Promise<FiscalServiceEntity> {
    const service = await this.fiscalServiceRepository.findByExternalPlanCode(
      input.externalPlanCode,
    );
    return service;
  }
}
