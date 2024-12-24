import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { FiscalNfConfigPrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-nf-config-prisma.repository';
import { CreateFiscalNfConfigUseCase } from './application/usecases/create-fiscal-nf-config.usecase';
import { UpdateFiscalNfConfigUseCase } from './application/usecases/update-fiscal-nf-config.usecase';
import { GetFiscalNfConfigsByEmitterUseCase } from './application/usecases/get-fiscal-nf-config-byEmitter.usecase';
import { FiscalNfConfigRepository } from './domain/repositories/fiscal-nf-config.repository';
import { FiscalNfConfigListenerEvents } from './domain/events/listeners/fiscal-nf-config-listener.events';
import { ConfigService } from '@nestjs/config';
import { FiscalNfConfigController } from './infrastructure/controllers/fiscal-nf-config.controller';

@Module({
  controllers: [FiscalNfConfigController],
  providers: [
    PrismaService,
    FiscalNfConfigListenerEvents,
    ConfigService,
    {
      provide: 'FiscalNfConfigPrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalNfConfigPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: CreateFiscalNfConfigUseCase,
      useFactory: (repository: FiscalNfConfigRepository) =>
        new CreateFiscalNfConfigUseCase(repository),
      inject: ['FiscalNfConfigPrismaRepository'],
    },
    {
      provide: UpdateFiscalNfConfigUseCase,
      useFactory: (repository: FiscalNfConfigRepository) =>
        new UpdateFiscalNfConfigUseCase(repository),
      inject: ['FiscalNfConfigPrismaRepository'],
    },
    {
      provide: GetFiscalNfConfigsByEmitterUseCase,
      useFactory: (repository: FiscalNfConfigRepository) =>
        new GetFiscalNfConfigsByEmitterUseCase(repository),
      inject: ['FiscalNfConfigPrismaRepository'],
    },
  ],
})
export class FiscalNfConfigModule {}
