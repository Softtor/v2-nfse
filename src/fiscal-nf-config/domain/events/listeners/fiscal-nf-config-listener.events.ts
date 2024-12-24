import { FiscalNfConfigOutputDto } from '@/fiscal-nf-config/application/dto/fiscal-nf-config-output.dto';
import { GetFiscalNfConfigsByEmitterUseCase } from '@/fiscal-nf-config/application/usecases/get-fiscal-nf-config-byEmitter.usecase';
import {
  UpdateFiscalNfConfigInput,
  UpdateFiscalNfConfigUseCase,
} from '@/fiscal-nf-config/application/usecases/update-fiscal-nf-config.usecase';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FiscalNfConfigListenerEvents {
  constructor(
    private readonly getFiscalNfConfig: GetFiscalNfConfigsByEmitterUseCase,
    private readonly updateFiscalNfConfig: UpdateFiscalNfConfigUseCase,
  ) {}

  @OnEvent('fiscal-nf-config.get')
  async handlerGetFiscalNfConfigEvent(emitterId: number) {
    console.log('handlerGetFiscalNfConfigEvent:', emitterId);
    return await this.getFiscalNfConfig.execute(emitterId);
  }

  @OnEvent('fiscal-nf-config.update')
  async handlerUpdateFiscalNfConfigEvent(input: UpdateFiscalNfConfigInput) {
    return await this.updateFiscalNfConfig.execute(input);
  }
}
