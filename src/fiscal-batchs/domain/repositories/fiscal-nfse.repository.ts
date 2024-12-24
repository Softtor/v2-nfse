import { FiscalNfseEntity } from '../entities/fiscal-nfse.entity';

export interface FiscalNfseRepository {
  findById(id: string): Promise<FiscalNfseEntity | null>;
  save(entity: FiscalNfseEntity): Promise<void>;
  update(entity: FiscalNfseEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findByRpsId(rpsId: string): Promise<FiscalNfseEntity | null>;
  findByTakerId(takerId: string): Promise<FiscalNfseEntity[]>;
}
