import { Test, TestingModule } from '@nestjs/testing';
import { ConsultAvailableRpsRepository } from '../../consult-available-rps.repository';
import { EnvConfigModule } from '../../../../../../shared/infrastructure/env-config/env-config.module';
import { EnvConfigService } from '../../../../../../shared/infrastructure/env-config/env-config.service';
import { createClientAsync, Client } from 'soap';
import { ProviderEntity } from '../../../../../domain/entities/provider.entity';
import { ISignProvider } from '../../../../../../shared/domain/providers/sign.provider';
import { SignProvider } from '../../../../../../shared/application/providers/sign.provider';
import { IStorageProvider } from '../../../../../../shared/domain/providers/storage.provider';
import { StorageProvider } from '../../../../../../shared/application/providers/storage.provider';
import { XmlProvider } from '../../../../../../shared/application/providers/xml.provider';
import { ICertificateProvider } from '../../../../../../shared/domain/providers/certificate.provider';
import { CertificateProvider } from '../../../../../../shared/application/providers/certificate.provider';

describe('ConsultAvailableRpsRepository', () => {
  let repository: ConsultAvailableRpsRepository;
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
          provide: 'IXmlProvider',
          useClass: XmlProvider,
        },
        {
          provide: Client,
          useFactory: async (envService: EnvConfigService) => {
            const client = await createClientAsync(envService.getNfseUrl());
            client.setEndpoint(envService.getNfseUrl());
            return client;
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
          provide: 'ISignProvider',
          useFactory: async (
            certificateProvider: ICertificateProvider,
            envConfigService: EnvConfigService,
          ) => {
            const pass = envConfigService.getNfseCertPass();
            const certificate = await certificateProvider.loadCertificate(pass);
            return new SignProvider(certificate);
          },
          inject: ['ICertificateProvider', EnvConfigService],
        },
        {
          provide: ConsultAvailableRpsRepository,
          useFactory: async (
            client: Client,
            signProvider: ISignProvider,
            storageProvider: IStorageProvider,
            xmlProvider: XmlProvider,
          ) => {
            return new ConsultAvailableRpsRepository(
              client,
              storageProvider,
              signProvider,
              xmlProvider,
            );
          },
          inject: [Client, 'ISignProvider', 'IStorageProvider', 'IXmlProvider'],
        },
      ],
    }).compile();
    repository = module.get<ConsultAvailableRpsRepository>(
      ConsultAvailableRpsRepository,
    );
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should fetch available rps', async () => {
    const provider = new ProviderEntity({
      cnpj: '33779923000142',
      municipalSubscription: '0791927900180',
    });
    const page = 1;
    const execSpy = jest.spyOn(repository, 'exec');
    const response = await repository.fetch(provider, page);
    console.log(response);
    expect(execSpy).toHaveBeenCalled();
  });
});
