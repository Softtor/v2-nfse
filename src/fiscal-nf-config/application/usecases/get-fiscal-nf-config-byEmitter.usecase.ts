import { FiscalNfConfigRepository } from '@/fiscal-nf-config/domain/repositories/fiscal-nf-config.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalNfConfigOutputDto,
  FiscalNfConfigOutputMapper,
} from '../dto/fiscal-nf-config-output.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetFiscalNfConfigsByEmitterUseCase {
  constructor(private fiscalNfConfigRepository: FiscalNfConfigRepository) {}

  async execute(emitterId: number): Promise<FiscalNfConfigOutputDto> {
    const config =
      await this.fiscalNfConfigRepository.findByEmitterId(emitterId);
    return FiscalNfConfigOutputMapper.toOutput(config);
  }
}
