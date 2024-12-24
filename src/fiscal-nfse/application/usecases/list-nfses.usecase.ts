import { SearchableNfseRepository } from '@/fiscal-nfse/domain/repositories/searchable-nfse-repository';
import { FiscalNfseEntity } from '../../domain/entities/fiscal-nfse.entity';
import { UseCase as DefaultUsecase } from '@/shared/application/usecases/use-case';
import { Inject } from '@nestjs/common';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';

export namespace ListNfses {
  export type Input = {
    page: number;
    perPage: number;
  };

  export type Output = Promise<
    {
      nfse: FiscalNfseEntity;
      taker: FiscalTakerEntity;
    }[]
  >;

  export class UseCase implements DefaultUsecase<Input, Output> {
    @Inject('SearchableNfseRepository')
    private nfseRepository: SearchableNfseRepository.Repository;

    execute(input: Input): Promise<
      {
        nfse: FiscalNfseEntity;
        taker: FiscalTakerEntity;
      }[]
    > {
      return this.nfseRepository.searchWithTaker(input);
    }
  }
}
