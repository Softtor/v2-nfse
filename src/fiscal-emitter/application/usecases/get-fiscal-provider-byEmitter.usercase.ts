import { FiscalProviderRepository } from '@/fiscal-emitter/domain/repositories/fiscal-provider.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalProviderOutputDto,
  FiscalProviderOutputMapper,
} from '../dto/fiscal-provider-output.dto';
import { Inject } from '@nestjs/common';

export type GetFiscalProviderInput = { id: number };
export type GetFiscalProviderOutput = FiscalProviderOutputDto;

export class GetFiscalProviderUseCase
  implements DefaultUseCase<GetFiscalProviderInput, GetFiscalProviderOutput>
{
  constructor(
    @Inject('FiscalProviderPrismaRepository')
    private readonly fiscalProviderRepository: FiscalProviderRepository,
  ) {}

  async execute(
    input: GetFiscalProviderInput,
  ): Promise<GetFiscalProviderOutput> {
    const { id } = input;
    const entity = await this.fiscalProviderRepository.findByEmitterId(id);
    return FiscalProviderOutputMapper.toOutput(entity);
  }
}
