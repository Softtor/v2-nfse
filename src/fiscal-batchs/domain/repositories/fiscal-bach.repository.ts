import { FiscalBatchNfseEntity } from '../entities/fiscal-bach.entity';

export interface FiscalBatchNfseRepository {
  findById(id: string): Promise<FiscalBatchNfseEntity>;
  save(entity: FiscalBatchNfseEntity): Promise<FiscalBatchNfseEntity>;
  update(entity: FiscalBatchNfseEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<FiscalBatchNfseEntity[]>;
  findUnconfirmedBatches(): Promise<FiscalBatchNfseEntity[]>;
}
