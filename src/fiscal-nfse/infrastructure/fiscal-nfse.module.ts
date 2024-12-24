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
import { ShowRpsByPaymentIdUseCase } from '@/fiscal-rps/application/usecases/show-rps-by-payment-id.usecase';
import { FiscalRpsPrismaRepository } from '@/fiscal-rps/infrastructure/database/prisma/repositories/fiscal-rps-prisma.repository';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [FiscalNfseController],
  providers: [
    GenerateNfseArchivesListener,
    PrismaService,
    CancelNfse.UseCase,
    ListNfses.UseCase,
    ShowNfseByNumber.UseCase,
    ShowRpsByPaymentIdUseCase.UseCase,
    {
      provide: 'SearchableNfseRepository',
      useClass: NfseRepositoryImpl,
    },
    {
      provide: 'FiscalRpsPrismaRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FiscalRpsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
  ],
})
export class FiscalNfseModule {}
