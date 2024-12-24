import { Injectable, Inject } from '@nestjs/common';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

@Injectable()
export class DeleteFiscalServiceUseCase {
  constructor(
    @Inject('FiscalServicePrismaRepository')
    private readonly fiscalServiceRepository: FiscalServiceRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const service = await this.fiscalServiceRepository.findById(id);
    if (!service) {
      throw new NotFoundError(`Service with ID ${id} not found.`);
    }

    await this.fiscalServiceRepository.delete(id);
  }
}
