import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalEmitterOutputDto,
  FiscalEmitterOutputMapper,
} from '../dto/fiscal-emitter-output.dto';

export type GetFiscalEmitterInput = {
  id: number;
};

export type GetFiscalEmitterOutput = FiscalEmitterOutputDto;

export class GetFiscalEmitterUseCase
  implements DefaultUseCase<GetFiscalEmitterInput, GetFiscalEmitterOutput>
{
  constructor(
    private readonly fiscalEmitterRepository: FiscalEmitterRepository,
  ) {}

  async execute(input: GetFiscalEmitterInput): Promise<GetFiscalEmitterOutput> {
    const { id } = input;
    const entity = await this.fiscalEmitterRepository.findById(id);
    return FiscalEmitterOutputMapper.toOutput(entity);
  }
}
