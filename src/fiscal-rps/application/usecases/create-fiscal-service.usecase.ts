import { Injectable, Inject } from '@nestjs/common';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export type CreateFiscalServiceInput = {
  serviceValue: number;
  serviceDescription: string;
  externalPlanCode: string;
};

@Injectable()
export class CreateFiscalServiceUseCase {
  constructor(
    @Inject('FiscalServicePrismaRepository')
    private readonly fiscalServiceRepository: FiscalServiceRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(input: CreateFiscalServiceInput): Promise<FiscalServiceEntity> {
    const exists = await this.fiscalServiceRepository.externalPlanCodeExists(
      input.externalPlanCode,
    );

    if (exists) {
      const service = await this.fiscalServiceRepository.findByExternalPlanCode(
        input.externalPlanCode,
      );
      return service;
    }

    const emitter = await this.getFiscalEmitter();
    const serviceEntity = await this.buildFiscalServiceEntity(input, emitter);
    await this.fiscalServiceRepository.save(serviceEntity);
    return serviceEntity;
  }

  private async getFiscalEmitter() {
    const emitter = await this.eventEmitter.emitAsync('fiscal-emitter.get', {
      id: 1,
    });

    if (!emitter || emitter.length === 0) {
      throw new NotFoundError(`Fiscal Emitter not found.`);
    }

    return emitter[0];
  }

  private async buildFiscalServiceEntity(
    input: CreateFiscalServiceInput,
    emitter: any,
  ): Promise<FiscalServiceEntity> {
    const entity = new FiscalServiceEntity({
      serviceValue: input.serviceValue,
      serviceDescription: input.serviceDescription,
      externalPlanCode: input.externalPlanCode,
      cnaeCode: emitter.cnaeCode,
      municipalityCode: emitter.address.municipalityCode,
      rate: emitter.aliquot,
      issValue: emitter.iss,
      incidenceMunicipality: emitter.address.municipalityCode,
      municipalTaxationCode: emitter.municipalTaxationCode,
      issExigibility: emitter.issExigibility ?? 0,
      pisValue: emitter.pis,
      serviceItemList: emitter.serviceItemList,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('entity ----->', entity);
    return entity;
  }
}
