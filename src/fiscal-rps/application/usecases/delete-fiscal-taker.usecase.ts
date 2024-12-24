import { Injectable, Inject } from '@nestjs/common';
import { FiscalTakerRepository } from '@/fiscal-rps/domain/repositories/fiscal-taker.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

@Injectable()
export class DeleteFiscalTakerUseCase {
  constructor(
    @Inject('FiscalTakerPrismaRepository')
    private readonly fiscalTakerRepository: FiscalTakerRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.fiscalTakerRepository.findById(id);
    await this.fiscalTakerRepository.delete(id);
  }
}
