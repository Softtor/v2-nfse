import { Test, TestingModule } from '@nestjs/testing';
import { CuritibaRepositoryImpl } from '../../curitiba-repository-impl';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { StorageProvider } from '@/shared/application/providers/storage.provider';
import { CertificateProvider } from '@/shared/application/providers/certificate.provider';
import { Client, createClient } from 'soap';
import { ICertificateProvider } from '@/shared/domain/providers/certificate.provider';
import { batch } from '../testing/builders';
import { BatchRpsMapper } from '../../mappers/batch-rps.mapper';
describe('ReceiveBatchRpsRepository', () => {
  let repository: CuritibaRepositoryImpl.RecepcionarLoteRps;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [
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
      ],
    }).compile();

    repository = module.get<CuritibaRepositoryImpl.RecepcionarLoteRps>(
      CuritibaRepositoryImpl.RecepcionarLoteRps,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should receive batch rps', async () => {
    const batchRps = new BatchRpsMapper(batch).toWS();
    await repository.send({ LoteRps: batchRps });
    const result = repository.getResponse();
    expect(result).toBeDefined();
    expect(result.batchnumber).toBeDefined();
    expect(result.protocol).toBeDefined();
    expect(result.message).toBeDefined();
  });
});
