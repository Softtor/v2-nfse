import { FiscalTakerEntity } from '../entities/fiscal-taker.entity';

export interface FiscalTakerRepository {
  save(entity: FiscalTakerEntity): Promise<void>;
  findById(id: string): Promise<FiscalTakerEntity>;
  update(entity: FiscalTakerEntity): Promise<void>;
  delete(id: string): Promise<void>;
  documentExists(document: string): Promise<boolean>;
  findByDocument(document: string): Promise<FiscalTakerEntity>;
  updateByDocument(document: string, entity: FiscalTakerEntity): Promise<void>;
}
