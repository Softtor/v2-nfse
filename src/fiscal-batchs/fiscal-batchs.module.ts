import { Module } from '@nestjs/common';
import { FiscalBatchService } from './application/services/fiscal-batch/fiscal-batchs.service';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { FiscalNfseService } from './application/services/fiscal-nfse/fiscal-nfse.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { FiscalNfsePrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-nfse-prisma.repository';
import { FiscalBatchNfsePrismaRepository } from './infrastructure/database/prisma/repositories/fiscal-batch-prisma.repository';
import { FiscalNfseListener } from './domain/events/listeners/fiscal-nfse-listener.event';
import { BatchProcessService } from './application/services/fiscal-batch/fiscal-batch-process.service';
import { BatchProviderService } from './application/services/fiscal-batch/fiscal-batch-provider.service';
import { BatchRpsService } from './application/services/fiscal-batch/fiscal-batch-rps.service';
import { BatchSoapService } from './application/services/fiscal-batch/fiscal-batch-soap.service';
import { BatchNotProcessService } from './application/services/fiscal-batch/fiscal-betch-not-process.service';
import { BatchTestController } from './infrastructure/controllers/fiscal-batch.controller';
import { RetryFailedConsultationService } from './application/services/fiscal-nfse/fiscal-nfse-retry-consult.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [BatchTestController],
  providers: [
    FiscalBatchService,
    FiscalNfseService,
    PrismaService,
    FiscalNfseListener,
    BatchProcessService,
    BatchProviderService,
    BatchRpsService,
    BatchSoapService,
    BatchNotProcessService,
    RetryFailedConsultationService,
    {
      provide: 'FiscalNfsePrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalNfsePrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: 'FiscalBatchPrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalBatchNfsePrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
  ],
})
export class FiscalBatchsModule {}
