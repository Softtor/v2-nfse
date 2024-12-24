import { SearchableNfseRepository } from '@/fiscal-nfse/domain/repositories/searchable-nfse-repository';
import { FiscalNfseEntity } from '../../domain/entities/fiscal-nfse.entity';
import { UseCase as DefaultUsecase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';

export namespace ListNfses {
  export type Input = {
    page: number;
    perPage: number;
  };

  export type Output = Promise<{
    items: {
      nfse: FiscalNfseEntity;
      taker: FiscalTakerEntity;
    }[];
    total: number;
  }>;

  @Injectable()
  export class UseCase implements DefaultUsecase<Input, Output> {
    @Inject('SearchableNfseRepository')
    private nfseRepository: SearchableNfseRepository.Repository;

    async execute(input: Input): Promise<Output> {
      const { skip, take } = this.paginate(input.page, input.perPage);
      const total = await this.nfseRepository.total();
      const items = await this.nfseRepository.searchWithTaker({ skip, take });
      return { items, total };
    }

    private paginate(page?: number | undefined, perPage?: number | undefined) {
      const currentPage = page || 1;
      const limit = perPage || 10;
      const skip = (currentPage - 1) * limit;
      return { skip, take: Number(limit) };
    }
  }
}
