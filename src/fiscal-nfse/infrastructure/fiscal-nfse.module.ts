import { Module } from '@nestjs/common';
import { FiscalNfseController } from './controllers/fiscal-nfse.controller';
import { SearchableNfseRepository } from '../domain/repositories/searchable-nfse-repository';
import { NfseRepositoryImpl } from './database/prisma/repositories/nfse.repository-impl';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CancelNfse } from '../application/usecases/cancel-nfse.usecase';
import { ListNfses } from '../application/usecases/list-nfses.usecase';
import { ShowNfseByNumber } from '../application/usecases/show-nfse-by-number.usecase';

@Module({
  controllers: [FiscalNfseController],
  providers: [
    PrismaService,
    CancelNfse.UseCase,
    ListNfses.UseCase,
    ShowNfseByNumber.UseCase,
    {
      provide: 'SearchableNfseRepository',
      useClass: NfseRepositoryImpl,
    },
  ],
})
export class FiscalNfseModule {}
