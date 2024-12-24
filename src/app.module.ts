import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { FiscalEmitterModule } from './fiscal-emitter/fiscal-emitter.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { FiscalNfConfigModule } from './fiscal-nf-config/fiscal-nf-config.module';
import { NfseModule } from './nfse/infrastructure/nfse.module';
import { FiscalRpsModule } from './fiscal-rps/fiscal-rps.module';
import { FiscalBatchsModule } from './fiscal-batchs/fiscal-batchs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SendEmailModule } from './send-email/infrastructure/send-email.module';
import { FiscalNfseModule } from './fiscal-nfse/infrastructure/fiscal-nfse.module';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    FiscalEmitterModule,
    PrismaModule,
    FiscalNfConfigModule,
    NfseModule,
    FiscalRpsModule,
    FiscalBatchsModule,
    SendEmailModule,
    FiscalNfseModule,
  ],
})
export class AppModule {}
