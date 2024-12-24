import {
  CancelNfseInput,
  CancelNfseOutput,
} from '@/nfse/domain/interfaces/cancel-nfse.interface';
import { CuritibaRepositoryImpl } from '@/nfse/infrastructure/repositories/soap/curitiba-repository-impl';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace CancelNfse {
  export type Input = CancelNfseInput;
  export type Output = Promise<CancelNfseOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly consultarNfsePorRpsRepository: CuritibaRepositoryImpl.CancelarNfse,
    ) {}

    execute(input: Input): Output {
      return this.consultarNfsePorRpsRepository.cancelarNfse(input);
    }
  }
}
