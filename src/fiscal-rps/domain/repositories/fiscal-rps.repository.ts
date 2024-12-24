import { FiscalRpsEntity } from '../entities/fiscal-rps.entity';

export interface FiscalRpsRepository {
  save(entity: FiscalRpsEntity): Promise<void>;
  findById(id: string): Promise<FiscalRpsEntity | null>;
  update(entity: FiscalRpsEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findAllByCreated(createdAfter: Date): Promise<FiscalRpsEntity[]>;
  findAll(batchId: string): Promise<FiscalRpsEntity[]>;
  findByNumber(number: string): Promise<FiscalRpsEntity>;
}
