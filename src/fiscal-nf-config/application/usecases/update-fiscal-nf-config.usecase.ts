import { FiscalNfConfigRepository } from '@/fiscal-nf-config/domain/repositories/fiscal-nf-config.repository';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalNfConfigOutputDto,
  FiscalNfConfigOutputMapper,
} from '../dto/fiscal-nf-config-output.dto';

export type UpdateFiscalNfConfigInput = {
  id: string;
  serie?: string;
  nextDocumentNumber?: number;
  simpleNational?: boolean;
  taxationRegime?: string;
  operationNature?: string;
  culturalIncentive?: boolean;
  fiscalIncentive?: boolean;
};

export class UpdateFiscalNfConfigUseCase {
  constructor(private fiscalNfConfigRepository: FiscalNfConfigRepository) {}

  async execute(
    input: UpdateFiscalNfConfigInput,
  ): Promise<FiscalNfConfigOutputDto> {
    const entity = await this.fiscalNfConfigRepository.findFirst();
    console.log(entity);
    if (!entity) {
      throw new NotFoundError('FiscalNfConfig not found.');
    }

    entity.update(input);

    await this.fiscalNfConfigRepository.update(entity);

    return this.mapToOutput(entity);
  }

  private mapToOutput(entity: FiscalNfConfigEntity): FiscalNfConfigOutputDto {
    return FiscalNfConfigOutputMapper.toOutput(entity);
  }
}
