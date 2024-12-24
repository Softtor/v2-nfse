import { SearchableNfseRepository } from '@/fiscal-nfse/domain/repositories/searchable-nfse-repository';
import { FiscalNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-nfse.entity';
import { UseCase as UseCaseContract } from '@/shared/application/usecases/use-case';
import { Inject } from '@nestjs/common';
export namespace ShowNfseByPaymentIdUseCase {
  export type Input = {
    paymentId: string;
  };

  export type Output = FiscalNfseEntity | null;

  export class UseCase implements UseCaseContract<Input, Output> {
    @Inject('NfseRepository')
    private nfseRepository: SearchableNfseRepository.Repository;
    execute(input: Input): Promise<FiscalNfseEntity> | null {
      return this.nfseRepository.findByPaymentId(input.paymentId);
    }
  }
}
