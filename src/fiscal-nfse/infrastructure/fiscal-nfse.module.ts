import { Module } from '@nestjs/common';
import { FiscalNfseController } from './controllers/fiscal-nfse.controller';
import { SearchableNfseRepository } from '../domain/repositories/searchable-nfse-repository';
import { NfseRepositoryImpl } from './database/prisma/repositories/nfse.repository-impl';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CancelNfse } from '../application/usecases/cancel-nfse.usecase';
import { ListNfses } from '../application/usecases/list-nfses.usecase';
import { ShowNfseByNumber } from '../application/usecases/show-nfse-by-number.usecase';
import { GenerateNfseArchivesListener } from '../application/events/generate-nfse-archives.event-listener';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ShowNfseByPaymentIdUseCase } from '../application/usecases/show-nfse-by-payment-id.usecase';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [FiscalNfseController],
  providers: [
    GenerateNfseArchivesListener,
    PrismaService,
    CancelNfse.UseCase,
    ListNfses.UseCase,
    ShowNfseByNumber.UseCase,
    ShowNfseByPaymentIdUseCase.UseCase,
    {
      provide: 'SearchableNfseRepository',
      useClass: NfseRepositoryImpl,
    },
  ],
})
export class FiscalNfseModule {}
