import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { UseCase as UseCaseContract } from '@/shared/application/usecases/use-case';
import { Inject } from '@nestjs/common';

export namespace DeleteFiscalRpsUseCase {
  export type Input = {
    paymentId: string;
  };
  export type Output = void;

  export class UseCase implements UseCaseContract<Input, Output> {
    @Inject('FiscalRpsPrismaRepository')
    private readonly fiscalRpsRepository: FiscalRpsRepository;
    async execute(input: Input): Promise<void> {
      this.fiscalRpsRepository.deleteByPaymentId(input.paymentId);
    }
  }
}
