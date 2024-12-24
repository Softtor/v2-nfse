import { Test, TestingModule } from '@nestjs/testing';
import { Client, createClient } from 'soap';
import { EnvConfigService } from '../../../../../../shared/infrastructure/env-config/env-config.service';
import { StorageProvider } from '../../../../../../shared/application/providers/storage.provider';
import { CertificateProvider } from '../../../../../../shared/application/providers/certificate.provider';
import { CuritibaRepositoryImpl } from '../../curitiba-repository-impl';
import { EnvConfigModule } from '../../../../../../shared/infrastructure/env-config/env-config.module';
import { ICertificateProvider } from '../../../../../../shared/domain/providers/certificate.provider';

describe('CancelarNfseRepository', () => {
  let repository: CuritibaRepositoryImpl.CancelarNfse;
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
          provide: CuritibaRepositoryImpl.CancelarNfse,
          useFactory: async (client: Client) => {
            return new CuritibaRepositoryImpl.CancelarNfse(client);
          },
          inject: [Client, EnvConfigService],
        },
      ],
    }).compile();

    repository = module.get<CuritibaRepositoryImpl.CancelarNfse>(
      CuritibaRepositoryImpl.CancelarNfse,
    );
    envConfigService = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should cancel the NFSe and return a valid response', async () => {
    const inputData = {
      CancelarNfseEnvio: {
        Pedido: {
          InfPedidoCancelamento: {
            IdentificacaoNfse: {
              Numero: '869',
              Cnpj: '46204900000151',
              InscricaoMunicipal: '010112006414',
            },
            CodigoCancelamento: '2',
          },
        },
      },
    };

    const mockResult = {
      CancelarNfseResult: {
        Protocolo: '1234567890',
        DataRecebimento: '2024-12-16T12:00:00.000Z',
      },
    };

    const result = await repository.cancelarNfse(inputData);

    console.log(result);

    console.log(
      result['CancelarNfseResult']['ListaMensagemRetorno']['MensagemRetorno'],
    );

    // expect(result.CancelarNfseResult.Protocolo).toBe(
    //   mockResult.CancelarNfseResult.Protocolo,
    // );
    // expect(result.CancelarNfseResult.DataRecebimento).toBe(
    //   mockResult.CancelarNfseResult.DataRecebimento,
    // );
  });
});
