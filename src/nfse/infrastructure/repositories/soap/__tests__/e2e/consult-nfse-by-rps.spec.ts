import { Test, TestingModule } from '@nestjs/testing';
import { Client, createClient } from 'soap';
import { EnvConfigService } from '../../../../../../shared/infrastructure/env-config/env-config.service';
import { StorageProvider } from '../../../../../../shared/application/providers/storage.provider';
import { CertificateProvider } from '../../../../../../shared/application/providers/certificate.provider';
import { CuritibaRepositoryImpl } from '../../curitiba-repository-impl';
import { EnvConfigModule } from '../../../../../../shared/infrastructure/env-config/env-config.module';
import { ICertificateProvider } from '../../../../../../shared/domain/providers/certificate.provider';
import { ConsultNfseByRpsInput } from '../../../../../domain/interfaces/consult-nfse-by-rps-input.interface';
import { ConsultNfseByRpsMockResult } from '../__mock__/mock';

describe('ConsultarNfsePorRpsRepository', () => {
  let repository: CuritibaRepositoryImpl.ConsultarNfsePorRps;
  let envConfigService: EnvConfigService;

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
          provide: CuritibaRepositoryImpl.ConsultarNfsePorRps,
          useFactory: async (client: Client) => {
            return new CuritibaRepositoryImpl.ConsultarNfsePorRps(client);
          },
          inject: [Client, EnvConfigService],
        },
      ],
    }).compile();

    repository = module.get<CuritibaRepositoryImpl.ConsultarNfsePorRps>(
      CuritibaRepositoryImpl.ConsultarNfsePorRps,
    );
    envConfigService = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should return the correct protocol in the correct format', async () => {
    const inputData: ConsultNfseByRpsInput = {
      numero: '26',
      serie: '1',
      tipo: 1,
      cnpj: '46204900000151',
      inscricaoMunicipal: '010112006414',
    };

    const result = await repository.consultarNfsePorRps(inputData);

    const protocol = result.getResponse();

    console.log(JSON.stringify(protocol));

    expect(protocol.protocol.ConsultarNfsePorRpsResult).toEqual(
      ConsultNfseByRpsMockResult.ConsultarNfsePorRpsResult,
    );
    expect.assertions(1);
  });
});
