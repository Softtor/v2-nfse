import { AddressEntity } from '@/nfse/domain/entities/address.entity';

export interface WsAddress {
  Endereco: string;
  Numero: string;
  Complemento?: string;
  Bairro: string;
  CodigoMunicipio: string;
  Uf: string;
  Cep: string;
}
export class AddressMapper {
  private entity: AddressEntity;

  constructor(addressEntity: AddressEntity) {
    this.entity = addressEntity;
  }

  toWS(): WsAddress {
    const addressObj: WsAddress = {
      Endereco: this.entity.address,
      Numero: this.entity.number,
      Bairro: this.entity.neighborhood,
      CodigoMunicipio: this.entity.municipalityCode,
      Uf: this.entity.state,
      Cep: this.entity.postalCode,
    };

    if (this.entity.complement) {
      addressObj.Complemento = this.entity.complement;
    }

    return addressObj;
  }

  private static formatPostalCode(postalCode: string): string {
    return `${postalCode.slice(0, 5)}-${postalCode.slice(5)}`;
  }

  static fromWS(wsAddress: WsAddress): AddressEntity {
    const { Endereco, Numero, Complemento, Bairro, CodigoMunicipio, Uf, Cep } =
      wsAddress;

    const addressEntity = new AddressEntity({
      address: Endereco,
      number: Numero,
      complement: Complemento,
      neighborhood: Bairro,
      municipalityCode: CodigoMunicipio,
      state: Uf,
      postalCode: AddressMapper.formatPostalCode(Cep),
    });

    return addressEntity;
  }
}
