import { StorageProvider } from '@/shared/application/providers/storage.provider';
import { UseCase as UseCaseContract } from '@/shared/application/usecases/use-case';
import { Inject } from '@nestjs/common';

export namespace SaveCertificateUseCase {
  export type Params = {
    certificate: Buffer;
  };

  export type Output = void;

  export class UseCase implements UseCaseContract<Params, Output> {
    @Inject('StorageProvider')
    private storageProvider: StorageProvider;

    async execute(params: Params): Promise<Output> {
      await this.storageProvider.saveFile(
        'certificate.pfx',
        params.certificate,
      );
    }
  }
}
