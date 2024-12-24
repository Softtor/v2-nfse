import { FiscalNfConfigRepository } from '@/fiscal-nf-config/domain/repositories/fiscal-nf-config.repository';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';

import { ConflictError } from '@/shared/domain/errors/conflict-error';
import {
  FiscalNfConfigOutputDto,
  FiscalNfConfigOutputMapper,
} from '../dto/fiscal-nf-config-output.dto';

export type CreateFiscalNfConfigInput = {
  serie: string;
  nextDocumentNumber: number;
  simpleNational?: boolean;
  taxationRegime: string;
  operationNature?: string;
  culturalIncentive?: boolean;
  fiscalIncentive?: boolean;
  emitterId: number;
};

export class CreateFiscalNfConfigUseCase {
  constructor(private fiscalNfConfigRepository: FiscalNfConfigRepository) {}

  async execute(
    input: CreateFiscalNfConfigInput,
  ): Promise<FiscalNfConfigOutputDto> {
    try {
      const entity = this.createEntity(input);
      await this.fiscalNfConfigRepository.insert(entity);
      return this.mapToOutput(entity);
    } catch (error) {
      console.log(error);
      if (error instanceof ConflictError) {
        throw new ConflictError(
          'A FiscalNfConfig with this serie already exists.',
        );
      }
      throw error;
    }
  }

  private createEntity(input: CreateFiscalNfConfigInput): FiscalNfConfigEntity {
    return new FiscalNfConfigEntity({
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private mapToOutput(entity: FiscalNfConfigEntity): FiscalNfConfigOutputDto {
    return FiscalNfConfigOutputMapper.toOutput(entity);
  }
}
