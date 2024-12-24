import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProviderMapper } from '@/fiscal-rps/infrastructure/interfaces/fiscal-provider-soap.mapper';

@Injectable()
export class BatchProviderService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async fetchProviderData(providerId: string): Promise<any> {
    const provider = await this.eventEmitter.emitAsync(
      'fiscal-provider.get.providerId',
      {
        id: providerId,
      },
    );
    console.log(provider[0]);
    if (!provider || !provider[0]) {
      throw new Error(`Provider not found for ID: ${providerId}`);
    }

    return ProviderMapper.toSoapFormat(provider[0]);
  }
}
