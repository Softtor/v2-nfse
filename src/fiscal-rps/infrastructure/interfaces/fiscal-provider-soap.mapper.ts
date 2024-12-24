import { FiscalProviderEntity } from '@/fiscal-emitter/domain/entities/fiscal-provider.entity';
import { ProviderInterface } from '@/nfse/domain/interfaces/common/provider.interface';

export class ProviderMapper {
  static toSoapFormat(provider: FiscalProviderEntity): ProviderInterface {
    return {
      Cnpj: provider.cnpj || '',
      InscricaoMunicipal: provider.municipalSubscription || '',
    };
  }
}
