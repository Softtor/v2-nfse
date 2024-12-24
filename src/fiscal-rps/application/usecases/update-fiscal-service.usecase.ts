import { Injectable, Inject } from '@nestjs/common';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export type UpdateFiscalServiceInput = {
  id: string;
  serviceValue?: number;
  serviceDescription?: string;
  externalPlanCode?: string;
  emitterId?: string;
};

@Injectable()
export class UpdateFiscalServiceUseCase {
  constructor(
    @Inject('FiscalServicePrismaRepository')
    private readonly fiscalServiceRepository: FiscalServiceRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(input: UpdateFiscalServiceInput): Promise<FiscalServiceEntity> {
    console.log('UpdateFiscalServiceUseCase', input);
    const existingService = await this.getExistingService(input.id);

    if (input.emitterId) {
      const emitter = await this.getFiscalEmitter(input.emitterId);
      existingService.updateFromEmitter(emitter);
    }

    existingService.updateFields({
      serviceValue: input.serviceValue,
      serviceDescription: input.serviceDescription,
      externalPlanCode: input.externalPlanCode,
    });

    await this.fiscalServiceRepository.update(existingService);
    return existingService;
  }

  private async getExistingService(
    serviceId: string,
  ): Promise<FiscalServiceEntity> {
    const service = await this.fiscalServiceRepository.findById(serviceId);
    if (!service) {
      throw new NotFoundError(`Service with ID ${serviceId} not found.`);
    }
    return service;
  }

  private async getFiscalEmitter(emitterId: string) {
    const emitter = await this.eventEmitter.emitAsync('fiscal-emitter.get', {
      id: emitterId,
    });

    if (!emitter || emitter.length === 0) {
      throw new NotFoundError(`Fiscal Emitter with ID ${emitterId} not found.`);
    }

    return emitter[0];
  }
}
