import { Injectable, Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import {
  FiscalRpsOutputDto,
  FiscalRpsOutputMapper,
} from '../dtos/fiscal-rps-output.dto';
import { UpdateFiscalRpsDTO } from '../dtos/fiscal-data-input.dto';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

@Injectable()
export class UpdateFiscalRpsUseCase {
  constructor(
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository,
  ) {}

  async execute(dto: UpdateFiscalRpsDTO): Promise<FiscalRpsOutputDto> {
    const existingRps = await this.fiscalRpsRepository.findById(dto.id);
    if (!existingRps.batchId) {
      existingRps.update({
        batchId: dto.batchId,
        issueDateRps: dto.issueDateRps ?? existingRps.issueDateRps,
        updatedAt: new Date(),
      });
    } else {
      existingRps.update({
        issueDateRps: dto.issueDateRps ?? existingRps.issueDateRps,
        updatedAt: new Date(),
      });
    }

    await this.fiscalRpsRepository.update(existingRps);
    return FiscalRpsOutputMapper.toOutput(existingRps);
  }
}
