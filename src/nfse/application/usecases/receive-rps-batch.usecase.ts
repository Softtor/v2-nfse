import { CuritibaRepositoryImpl } from '../../infrastructure/repositories/soap/curitiba-repository-impl';
import { ReceiveBatchRpsInterface } from '@/nfse/domain/interfaces/receive-batch-rps.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceiveRpsBatchUseCase {
  constructor(
    private readonly receiveBatchRpsRepository: CuritibaRepositoryImpl.RecepcionarLoteRps,
  ) {}

  async execute(input: ReceiveBatchRpsInterface) {
    return this.receiveBatchRpsRepository.send(input);
  }
}
