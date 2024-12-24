import { CancelNfse } from '@/fiscal-nfse/application/usecases/cancel-nfse.usecase';
import { ListNfses } from '@/fiscal-nfse/application/usecases/list-nfses.usecase';
import { ShowNfseByNumber } from '@/fiscal-nfse/application/usecases/show-nfse-by-number.usecase';
import { ShowRpsByPaymentIdUseCase } from '@/fiscal-rps/application/usecases/show-rps-by-payment-id.usecase';
import { CancelNfseInput } from '@/nfse/domain/interfaces/cancel-nfse.interface';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class FiscalNfseController {
  @Inject(ListNfses.UseCase)
  private listNfsesUseCase: ListNfses.UseCase;
  @Inject(ShowNfseByNumber.UseCase)
  private showNfseByNumberUseCase: ShowNfseByNumber.UseCase;
  @Inject(CancelNfse.UseCase)
  private cancelNfseUseCase: CancelNfse.UseCase;
  @Inject(ShowRpsByPaymentIdUseCase.UseCase)
  private showRpsByPaymentId: ShowRpsByPaymentIdUseCase.UseCase;

  @MessagePattern('find-all-nfses')
  findAll(
    @Payload()
    input: {
      page: number;
      perPage: number;
    } = { page: 1, perPage: 10 },
  ) {
    try {
      return this.listNfsesUseCase.execute(input);
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }

  @MessagePattern('find-nfse-by-number')
  findOne(@Payload() nfseNumber: number) {
    try {
      return this.showNfseByNumberUseCase.execute(nfseNumber);
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }

  @MessagePattern('find-by-payment-id')
  findByPaymentId(@Payload() payment: { paymentId: string }) {
    try {
      return this.showRpsByPaymentId.execute(payment);
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }

  @MessagePattern('cancel-nfse-by-number')
  cancel(@Payload() data: CancelNfseInput) {
    try {
      return this.cancelNfseUseCase.execute(data);
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }
}
