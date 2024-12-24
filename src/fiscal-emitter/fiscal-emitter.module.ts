import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { FiscalEmitterPrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-emitter-prisma.repository';
import { CreateFiscalEmitterUseCase } from './application/usecases/create-fiscal-emitter.usecase';
import { UpdateFiscalEmitterUseCase } from './application/usecases/update-fiscal-emitter.usecase';
import { GetFiscalEmitterUseCase } from './application/usecases/get-fiscal-emitter.usecase';
import { FiscalEmitterController } from './infrastructure/controllers/fiscal-emitter.controller';
import { ListFiscalEmitterUseCase } from './application/usecases/list-fiscal-emitter.usecase';
import { FiscalEmitterRepository } from './domain/repositories/fiscal-emitter.repository';
import { FiscalProviderPrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-provider-prisma.repository';
import { FiscalProviderRepository } from './domain/repositories/fiscal-provider.repository';
import { FiscalEmitterListener } from './domain/events/listeners/fiscal-emitter.listener';
import { GetFiscalProviderUseCase } from './application/usecases/get-fiscal-provider-byEmitter.usercase';
import { GetFiscalProviderByIdUseCase } from './application/usecases/get-fiscal-provider-byId.usecase';
import { GetFiscalProviderByIMUseCase } from './application/usecases/get-fiscal-provider-byIM.usecase';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { createRabbitMQMicroservice } from '@/shared/infrastructure/microservice/microservice';
import { ConfigService } from '@nestjs/config';
import { StorageProvider } from '@/shared/application/providers/storage.provider';
import { SaveCertificateUseCase } from './application/usecases/save-certificate.usecase';
import path from 'node:path';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [FiscalEmitterController],
  providers: [
    PrismaService,
    FiscalEmitterListener,
    ConfigService,
    SaveCertificateUseCase.UseCase,
    {
      provide: 'FiscalEmitterPrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalEmitterPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: 'FiscalProviderPrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalProviderPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: CreateFiscalEmitterUseCase,
      useFactory: (
        repository: FiscalEmitterRepository,
        providerRepository: FiscalProviderRepository,
      ) => new CreateFiscalEmitterUseCase(repository, providerRepository),
      inject: [
        'FiscalEmitterPrismaRepository',
        'FiscalProviderPrismaRepository',
      ],
    },
    {
      provide: UpdateFiscalEmitterUseCase,
      useFactory: (repository: FiscalEmitterRepository) =>
        new UpdateFiscalEmitterUseCase(repository),
      inject: ['FiscalEmitterPrismaRepository'],
    },
    {
      provide: GetFiscalEmitterUseCase,
      useFactory: (repository: FiscalEmitterRepository) =>
        new GetFiscalEmitterUseCase(repository),
      inject: ['FiscalEmitterPrismaRepository'],
    },
    {
      provide: 'StorageProvider',
      useFactory: (envService: EnvConfigService) => {
        return new StorageProvider(envService);
      },
      inject: [EnvConfigService],
    },
    {
      provide: ListFiscalEmitterUseCase,
      useFactory: (repository: FiscalEmitterRepository) =>
        new ListFiscalEmitterUseCase(repository),
      inject: ['FiscalEmitterPrismaRepository'],
    },
    {
      provide: GetFiscalProviderUseCase,
      useFactory: (repository: FiscalProviderRepository) =>
        new GetFiscalProviderUseCase(repository),
      inject: ['FiscalProviderPrismaRepository'],
    },
    {
      provide: GetFiscalProviderByIdUseCase,
      useFactory: (repository: FiscalProviderRepository) =>
        new GetFiscalProviderByIdUseCase(repository),
      inject: ['FiscalProviderPrismaRepository'],
    },
    {
      provide: GetFiscalProviderByIMUseCase,
      useFactory: (repository: FiscalProviderRepository) =>
        new GetFiscalProviderByIMUseCase(repository),
      inject: ['FiscalProviderPrismaRepository'],
    },
    EnvConfigService,
  ],
})
export class FiscalEmitterModule {}
