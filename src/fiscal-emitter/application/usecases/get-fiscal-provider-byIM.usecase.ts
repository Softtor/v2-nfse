import { FiscalProviderRepository } from '@/fiscal-emitter/domain/repositories/fiscal-provider.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalProviderOutputDto,
  FiscalProviderOutputMapper,
} from '../dto/fiscal-provider-output.dto';
import { Inject } from '@nestjs/common';

export type GetFiscalProviderByIMInput = { im: string };
export type GetFiscalProviderByIMOutput = FiscalProviderOutputDto;

export class GetFiscalProviderByIMUseCase
  implements
    DefaultUseCase<GetFiscalProviderByIMInput, GetFiscalProviderByIMOutput>
{
  constructor(
    @Inject('FiscalProviderPrismaRepository')
    private readonly fiscalProviderRepository: FiscalProviderRepository,
  ) {}

  async execute(
    input: GetFiscalProviderByIMInput,
  ): Promise<GetFiscalProviderByIMOutput> {
    const { im } = input;
    const entity = await this.fiscalProviderRepository.findByIm(im);
    return FiscalProviderOutputMapper.toOutput(entity);
  }
}
