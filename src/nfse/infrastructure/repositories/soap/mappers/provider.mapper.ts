import { ProviderEntity } from '@/nfse/domain/entities/provider.entity';

export interface WsProvider {
  InscricaoMunicipal: string;
  Cnpj?: string;
}

export class ProviderMapper {
  private entity: ProviderEntity;
  constructor(providerEntity: ProviderEntity) {
    this.entity = providerEntity;
  }
  toWS(): WsProvider {
    const xmlObj: WsProvider = {
      InscricaoMunicipal: this.entity.municipalSubscription,
      Cnpj: this.entity.cnpj,
    };

    return xmlObj;
  }

  static fromWS(wsProvider: WsProvider): ProviderEntity {
    const { InscricaoMunicipal, Cnpj } = wsProvider;
    const providerEntity = new ProviderEntity({
      municipalSubscription: InscricaoMunicipal,
      cnpj: Cnpj,
    });

    return providerEntity;
  }
}
