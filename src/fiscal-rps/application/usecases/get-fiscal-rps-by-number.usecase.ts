import { Injectable, Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import {
  FiscalRpsOutputDto,
  FiscalRpsOutputMapper,
} from '../dtos/fiscal-rps-output.dto';

@Injectable()
export class GetRpsByIdUseCase {
  constructor(
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository,
  ) {}

  async execute(rpsNumber): Promise<FiscalRpsOutputDto> {
    const rps = await this.fiscalRpsRepository.findByNumber(rpsNumber);
    return FiscalRpsOutputMapper.toOutput(rps);
  }
}
