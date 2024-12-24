import { Module } from '@nestjs/common';
import { FiscalRpsService } from './application/services/fiscal-rps.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { FiscalRpsPrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-rps-prisma.repository';
import { FiscalServicePrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-service-prisma.repository';
import { FiscalTakerPrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-taker-prisma.repository';
import { FiscalRpsListener } from './domain/events/listeners/fiscal-rps-listener.event';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { FiscalRpsController } from './infrastructure/controllers/fiscal-rps.controller';
import { GetServiceUseCase } from './application/usecases/get-fiscal-service.usecase';
import { GetTakerUseCase } from './application/usecases/get-fiscal-taker.usecase';
import { CreateFiscalServiceUseCase } from './application/usecases/create-fiscal-service.usecase';
import { UpdateFiscalServiceUseCase } from './application/usecases/update-fiscal-service.usecase';
import { DeleteFiscalServiceUseCase } from './application/usecases/delete-fiscal-service.usecase';
import { CreateFiscalTakerUseCase } from './application/usecases/create-fiscal-taker.usecase';
import { UpdateFiscalTakerUseCase } from './application/usecases/update-fiscal-taker.usecase';
import { DeleteFiscalTakerUseCase } from './application/usecases/delete-fiscal-taker.usecase';
import { CreateFiscalRpsUseCase } from './application/usecases/create-fiscal-rps.usecase';
import { UpdateFiscalRpsUseCase } from './application/usecases/update-fiscal-rps.usecase';
import { FindFiscalRpsByCreatedAtUseCase } from './application/usecases/get-fiscal-rps-by-created-at.usecase';
import { FindAllFiscalRpsUseCase } from './application/usecases/get-fiscal-rps.usecase';
import { GetServiceByIdUseCase } from './application/usecases/get-fiscal-service-id.usecase';
import { GetTakerByIdUseCase } from './application/usecases/get-fiscal-taker-byId.usecase';
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { DeleteFiscalRpsUseCase } from './application/usecases/delete-fiscal-rps.usecase';
import { ConfigService } from '@nestjs/config';
import { GetRpsByIdUseCase } from './application/usecases/get-fiscal-rps-by-number.usecase';
import { ShowRpsByPaymentIdUseCase } from './application/usecases/show-rps-by-payment-id.usecase';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [FiscalRpsController],
  providers: [
    FiscalRpsService,
    FiscalRpsListener,
    PrismaService,
    ConfigService,
    EnvConfigService,
    {
      provide: 'FiscalRpsPrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalRpsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: 'FiscalServicePrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalServicePrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: 'FiscalTakerPrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalTakerPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: GetServiceUseCase,
      useFactory: (fiscalServiceRepository: FiscalServicePrismaRepository) => {
        return new GetServiceUseCase(fiscalServiceRepository);
      },
      inject: ['FiscalServicePrismaRepository'],
    },
    {
      provide: GetTakerUseCase,
      useFactory: (fiscalTakerRepository: FiscalTakerPrismaRepository) => {
        return new GetTakerUseCase(fiscalTakerRepository);
      },
      inject: ['FiscalTakerPrismaRepository'],
    },
    {
      provide: GetServiceByIdUseCase,
      useFactory: (fiscalServiceRepository: FiscalServicePrismaRepository) => {
        return new GetServiceByIdUseCase(fiscalServiceRepository);
      },
      inject: ['FiscalServicePrismaRepository'],
    },
    {
      provide: GetTakerByIdUseCase,
      useFactory: (fiscalTakerRepository: FiscalTakerPrismaRepository) => {
        return new GetTakerByIdUseCase(fiscalTakerRepository);
      },
      inject: ['FiscalTakerPrismaRepository'],
    },
    {
      provide: CreateFiscalServiceUseCase,
      useFactory: (
        fiscalServiceRepository: FiscalServicePrismaRepository,
        eventEmitter: EventEmitter2,
      ) => {
        return new CreateFiscalServiceUseCase(
          fiscalServiceRepository,
          eventEmitter,
        );
      },
      inject: ['FiscalServicePrismaRepository', EventEmitter2],
    },
    {
      provide: UpdateFiscalServiceUseCase,
      useFactory: (
        fiscalServiceRepository: FiscalServicePrismaRepository,
        eventEmitter: EventEmitter2,
      ) => {
        return new UpdateFiscalServiceUseCase(
          fiscalServiceRepository,
          eventEmitter,
        );
      },
      inject: ['FiscalServicePrismaRepository'],
    },
    {
      provide: DeleteFiscalServiceUseCase,
      useFactory: (fiscalServiceRepository: FiscalServicePrismaRepository) => {
        return new DeleteFiscalServiceUseCase(fiscalServiceRepository);
      },
      inject: ['FiscalServicePrismaRepository'],
    },
    {
      provide: CreateFiscalTakerUseCase,
      useFactory: (fiscalTakerRepository: FiscalTakerPrismaRepository) => {
        return new CreateFiscalTakerUseCase(fiscalTakerRepository);
      },
      inject: ['FiscalTakerPrismaRepository'],
    },
    {
      provide: UpdateFiscalTakerUseCase,
      useFactory: (fiscalTakerRepository: FiscalTakerPrismaRepository) => {
        return new UpdateFiscalTakerUseCase(fiscalTakerRepository);
      },
      inject: ['FiscalTakerPrismaRepository'],
    },
    {
      provide: DeleteFiscalTakerUseCase,
      useFactory: (fiscalTakerRepository: FiscalTakerPrismaRepository) => {
        return new DeleteFiscalTakerUseCase(fiscalTakerRepository);
      },
      inject: ['FiscalTakerPrismaRepository'],
    },
    {
      provide: CreateFiscalRpsUseCase,
      useFactory: (
        fiscalRpsRepository: FiscalRpsPrismaRepository,
        eventEmitter: EventEmitter2,
      ) => {
        return new CreateFiscalRpsUseCase(fiscalRpsRepository, eventEmitter);
      },
      inject: ['FiscalRpsPrismaRepository', EventEmitter2],
    },
    {
      provide: UpdateFiscalRpsUseCase,
      useFactory: (fiscalRpsRepository: FiscalRpsPrismaRepository) => {
        return new UpdateFiscalRpsUseCase(fiscalRpsRepository);
      },
      inject: ['FiscalRpsPrismaRepository'],
    },
    {
      provide: FindFiscalRpsByCreatedAtUseCase,
      useFactory: (
        fiscalRpsRepository: FiscalRpsPrismaRepository,
        eventEmitter: EventEmitter2,
      ) => {
        return new FindFiscalRpsByCreatedAtUseCase(
          fiscalRpsRepository,
          eventEmitter,
        );
      },
      inject: ['FiscalRpsPrismaRepository', EventEmitter2],
    },
    {
      provide: FindAllFiscalRpsUseCase,
      useFactory: (
        fiscalRpsRepository: FiscalRpsPrismaRepository,
        eventEmitter: EventEmitter2,
      ) => {
        return new FindAllFiscalRpsUseCase(fiscalRpsRepository, eventEmitter);
      },
      inject: ['FiscalRpsPrismaRepository', EventEmitter2],
    },
    {
      provide: GetRpsByIdUseCase,
      useFactory: (fiscalRpsRepository: FiscalRpsPrismaRepository) => {
        return new GetRpsByIdUseCase(fiscalRpsRepository);
      },
      inject: ['FiscalRpsPrismaRepository'],
    },
    DeleteFiscalRpsUseCase.UseCase,
    ShowRpsByPaymentIdUseCase.UseCase,
  ],
  exports: [FiscalRpsListener],
})
export class FiscalRpsModule {}
