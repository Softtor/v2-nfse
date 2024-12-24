import { Injectable, Inject } from '@nestjs/common';
import { FiscalTakerRepository } from '@/fiscal-rps/domain/repositories/fiscal-taker.repository';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export type GetTakerInput = {
  document: string;
};

@Injectable()
export class GetTakerUseCase {
  constructor(
    @Inject('FiscalTakerPrismaRepository')
    private readonly fiscalTakerRepository: FiscalTakerRepository,
  ) {}

  async execute(input: GetTakerInput): Promise<FiscalTakerEntity> {
    const taker = await this.fiscalTakerRepository.findByDocument(
      input.document,
    );
    return taker;
  }
}
