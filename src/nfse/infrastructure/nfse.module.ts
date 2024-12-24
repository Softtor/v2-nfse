import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { StorageProvider } from '@/shared/application/providers/storage.provider';
import { CertificateProvider } from '@/shared/application/providers/certificate.provider';
import { Client, createClient } from 'soap';
import { ICertificateProvider } from '@/shared/domain/providers/certificate.provider';
import { CuritibaRepositoryImpl } from './repositories/soap/curitiba-repository-impl';
import { ReceiveRpsBatchUseCase } from '../application/usecases/receive-rps-batch.usecase';
import { NfseBatchListener } from '../domain/events/listeners/nfse-batch-listener.events';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EnvConfigModule.forRoot(), EventEmitterModule.forRoot()],
  providers: [
    ReceiveRpsBatchUseCase,
    NfseBatchListener,
    {
      provide: 'IStorageProvider',
      useFactory: (envService: EnvConfigService) => {
        const storage = new StorageProvider(
          envService,
          envService.getNfseSchemasPath(),
        );
        return storage;
      },
      inject: [EnvConfigService],
    },
    {
      provide: 'ICertificateProvider',
      useFactory: (envService: EnvConfigService) => {
        return new CertificateProvider(new StorageProvider(envService));
      },
      inject: [EnvConfigService],
    },
    {
      provide: Client,
      useFactory: async (
        envService: EnvConfigService,
        certificate: ICertificateProvider,
      ) => {
        return new Promise((resolve, reject) => {
          createClient(
            envService.getNfseUrl(),
            {
              wsdl_options: {
                pfx: certificate.getCertificate(),
                passphrase: envService.getNfseCertPass(),
                strictSSL: false,
              },
            },
            (err, client) => {
              if (err) {
                reject(err);
              }
              resolve(client);
            },
            envService.getNfseBinding(),
          );
        });
      },
      inject: [EnvConfigService, 'ICertificateProvider'],
    },
    {
      provide: CuritibaRepositoryImpl.RecepcionarLoteRps,
      useFactory: async (client: Client) => {
        return new CuritibaRepositoryImpl.RecepcionarLoteRps(client);
      },
      inject: [Client, EnvConfigService],
    },
    {
      provide: CuritibaRepositoryImpl.ConsultarSituacaoLoteRps,
      useFactory: async (client: Client) => {
        return new CuritibaRepositoryImpl.ConsultarSituacaoLoteRps(client);
      },
      inject: [Client],
    },
    {
      provide: CuritibaRepositoryImpl.ConsultarNfsePorRps,
      useFactory: async (client: Client) => {
        return new CuritibaRepositoryImpl.ConsultarNfsePorRps(client);
      },
      inject: [Client],
    },
  ],
})
export class NfseModule {}
