import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { FiscalNfseEntity } from '../entities/fiscal-nfse.entity';

export namespace SearchableNfseRepository {
  export type SearchInput = {
    page?: number;
    perPage?: number;
  };

  export interface Repository {
    search(input: SearchInput): Promise<FiscalNfseEntity[]>;
    searchWithTaker(
      input: SearchInput,
    ): Promise<{ nfse: FiscalNfseEntity; taker: FiscalTakerEntity }[]>;
    searchByNumber(number: number): Promise<FiscalNfseEntity>;
    cancelNfse(number: number): Promise<void>;
    update(id: string, data: Partial<FiscalNfseEntity>): Promise<void>;
    findByPaymentId(paymentId: string): Promise<FiscalNfseEntity>;
  }
}
