import { FiscalServiceEntity } from '../entities/fiscal-service.entity';

export interface FiscalServiceRepository {
  save(entity: FiscalServiceEntity): Promise<void>;
  findById(id: string): Promise<FiscalServiceEntity>;
  update(entity: FiscalServiceEntity): Promise<void>;
  delete(id: string): Promise<void>;
  externalPlanCodeExists(externalPlanCode: string): Promise<boolean>;
  findByExternalPlanCode(
    externalPlanCode: string,
  ): Promise<FiscalServiceEntity>;
}
