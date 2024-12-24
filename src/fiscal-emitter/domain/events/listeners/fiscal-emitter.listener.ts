import {
  GetFiscalEmitterInput,
  GetFiscalEmitterUseCase,
} from '@/fiscal-emitter/application/usecases/get-fiscal-emitter.usecase';
import {
  GetFiscalProviderInput,
  GetFiscalProviderUseCase,
} from '@/fiscal-emitter/application/usecases/get-fiscal-provider-byEmitter.usercase';
import {
  GetFiscalProviderByIdInput,
  GetFiscalProviderByIdUseCase,
} from '@/fiscal-emitter/application/usecases/get-fiscal-provider-byId.usecase';
import {
  GetFiscalProviderByIMInput,
  GetFiscalProviderByIMUseCase,
} from '@/fiscal-emitter/application/usecases/get-fiscal-provider-byIM.usecase';

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FiscalEmitterListener {
  constructor(
    private readonly getFiscalEmitter: GetFiscalEmitterUseCase,
    private readonly getFiscalProvider: GetFiscalProviderUseCase,
    private readonly getFiscalProviderById: GetFiscalProviderByIdUseCase,
    private readonly getFiscalProviderByIm: GetFiscalProviderByIMUseCase,
  ) {}

  @OnEvent('fiscal-emitter.get')
  async handleFiscalEmitterGetEvent(event: GetFiscalEmitterInput) {
    const emitter = await this.getFiscalEmitter.execute({ id: 1 });
    return emitter;
  }

  @OnEvent('fiscal-provider.get')
  async handleFiscalProviderGetEvent(event: GetFiscalProviderInput) {
    const provider = await this.getFiscalProvider.execute(event);
    return provider;
  }
  @OnEvent('fiscal-provider.get.providerId')
  async handleFiscalProviderByIdGetEvent(event: GetFiscalProviderByIdInput) {
    const provider = await this.getFiscalProviderById.execute(event);
    return provider;
  }
  @OnEvent('fiscal-provider.get.municipalitySubscription')
  async handleFiscalProviderByImGetEvent(event: GetFiscalProviderByIMInput) {
    const provider = await this.getFiscalProviderByIm.execute(event);
    return provider;
  }
}
