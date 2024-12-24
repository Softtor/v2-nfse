import { FiscalProviderRepository } from '@/fiscal-emitter/domain/repositories/fiscal-provider.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalProviderOutputDto,
  FiscalProviderOutputMapper,
} from '../dto/fiscal-provider-output.dto';
import { Inject } from '@nestjs/common';

export type GetFiscalProviderByIdInput = { id: string };
export type GetFiscalProviderByIdOutput = FiscalProviderOutputDto;

export class GetFiscalProviderByIdUseCase
  implements
    DefaultUseCase<GetFiscalProviderByIdInput, GetFiscalProviderByIdOutput>
{
  constructor(
    @Inject('FiscalProviderPrismaRepository')
    private readonly fiscalProviderRepository: FiscalProviderRepository,
  ) {}

  async execute(
    input: GetFiscalProviderByIdInput,
  ): Promise<GetFiscalProviderByIdOutput> {
    const { id } = input;
    const entity = await this.fiscalProviderRepository.findById(id);
    return FiscalProviderOutputMapper.toOutput(entity);
  }
}
