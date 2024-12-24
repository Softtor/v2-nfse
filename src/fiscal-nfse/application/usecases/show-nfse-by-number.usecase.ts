import { SearchableNfseRepository } from '@/fiscal-nfse/domain/repositories/searchable-nfse-repository';
import { FiscalNfseEntity } from '../../domain/entities/fiscal-nfse.entity';
import { UseCase as DefaultUsecase } from '@/shared/application/usecases/use-case';
import { Inject } from '@nestjs/common';

export namespace ShowNfseByNumber {
  export type Input = number;

  export type Output = Promise<FiscalNfseEntity>;

  export class UseCase implements DefaultUsecase<Input, Output> {
    @Inject('SearchableNfseRepository')
    private nfseRepository: SearchableNfseRepository.Repository;

    execute(input: Input): Promise<FiscalNfseEntity> {
      return this.nfseRepository.searchByNumber(input);
    }
  }
}
