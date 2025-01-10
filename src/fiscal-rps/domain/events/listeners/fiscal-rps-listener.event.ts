import { UpdateFiscalRpsDTO } from '@/fiscal-rps/application/dtos/fiscal-data-input.dto';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateFiscalRpsUseCase } from '@/fiscal-rps/application/usecases/update-fiscal-rps.usecase';
import { GetTakerUseCase } from '@/fiscal-rps/application/usecases/get-fiscal-taker.usecase';
import { GetServiceUseCase } from '@/fiscal-rps/application/usecases/get-fiscal-service.usecase';
import { FindFiscalRpsByCreatedAtUseCase } from '@/fiscal-rps/application/usecases/get-fiscal-rps-by-created-at.usecase';
import { FindAllFiscalRpsUseCase } from '@/fiscal-rps/application/usecases/get-fiscal-rps.usecase';
import { GetServiceByIdUseCase } from '@/fiscal-rps/application/usecases/get-fiscal-service-id.usecase';
import { GetTakerByIdUseCase } from '@/fiscal-rps/application/usecases/get-fiscal-taker-byId.usecase';
import { GetRpsByIdUseCase } from '@/fiscal-rps/application/usecases/get-fiscal-rps-by-number.usecase';

@Injectable()
export class FiscalRpsListener {
  constructor(
    private readonly updateFiscalRpsUseCase: UpdateFiscalRpsUseCase,
    private readonly findFiscalRpsByCreatedAtUseCase: FindFiscalRpsByCreatedAtUseCase,
    private readonly findAllFiscalRps: FindAllFiscalRpsUseCase,
    private readonly getTakerUseCase: GetTakerUseCase,
    private readonly getTakerByIdUseCase: GetTakerByIdUseCase,
    private readonly getServiceUseCase: GetServiceUseCase,
    private readonly getServiceByIdUseCase: GetServiceByIdUseCase,
    private readonly getRpsByNumberUseCase: GetRpsByIdUseCase,
  ) {}

  @OnEvent('fiscal-rps.update')
  async handleFiscalRpsUpdateEvent(dto: UpdateFiscalRpsDTO) {
    console.log('dto fiscal-rps.update', dto);
    const updatedRps = await this.updateFiscalRpsUseCase.execute(dto);
    return updatedRps;
  }

  @OnEvent('fiscal-rps.findAllByCreatedAt')
  async handleFiscalRpsFindAllByCreatedAtEvent(createdAt: Date) {
    const rpsList =
      await this.findFiscalRpsByCreatedAtUseCase.execute(createdAt);
    return rpsList;
  }

  @OnEvent('fiscal-rps.findAll')
  async handlerFindAllFiscalRps(event) {
    const rpsList = await this.findAllFiscalRps.execute(event.batchId);
    return rpsList;
  }

  @OnEvent('fiscal-taker.get')
  async handleFiscalTakerGetEvent(document: string) {
    const taker = await this.getTakerUseCase.execute({ document });
    return taker;
  }
  @OnEvent('fiscal-taker.get.takerId')
  async handleFiscalTakerByIdGetEvent(id: string) {
    const taker = await this.getTakerByIdUseCase.execute({ id });
    return taker;
  }

  @OnEvent('fiscal-service.get')
  async handleFiscalServiceGetEvent(externalPlanCode: string) {
    const service = await this.getServiceUseCase.execute({ externalPlanCode });
    return service;
  }
  @OnEvent('fiscal-service.get.serviceId')
  async handleFiscalServiceGetByIdEvent(id: string) {
    const service = await this.getServiceByIdUseCase.execute({ id });
    return service;
  }

  @OnEvent('fiscal-rps.get.byNumber')
  async handleFiscalRpsGetByNumberEvent(rpsNumber: string) {
    const rps = await this.getRpsByNumberUseCase.execute(rpsNumber);
    return rps;
  }
}
