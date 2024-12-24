import { UseCase as UseCaseContract } from '@/shared/application/usecases/use-case';
import { Inject } from '@nestjs/common';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { FiscalNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-nfse.entity';
// must improve this file
export namespace ShowRpsByPaymentIdUseCase {
  export type Input = {
    paymentId: string;
  };

  export type Output = FiscalNfseEntity | null;

  export class UseCase implements UseCaseContract<Input, Output> {
    @Inject('FiscalRpsPrismaRepository')
    private rpsRepository: FiscalRpsRepository;

    async execute(input: Input): Promise<Output> | null {
      const rps = await this.rpsRepository.findNfseByRpsPaymentId(
        input.paymentId,
      );
      if (!rps) {
        return null;
      }
      console.log('ShowRpsByPaymentIdUseCase', rps);
      return rps;
    }
  }
}
