import { FiscalProviderEntity } from '../entities/fiscal-provider.entity';

export interface FiscalProviderRepository {
  findById(id: string): Promise<FiscalProviderEntity>;
  save(entity: FiscalProviderEntity): Promise<void>;
  update(entity: FiscalProviderEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findByEmitterId(emitterId: number): Promise<FiscalProviderEntity>;
  findByIm(im: string): Promise<FiscalProviderEntity>;
}
