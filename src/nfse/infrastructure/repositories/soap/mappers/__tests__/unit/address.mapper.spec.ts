import { AddressMapper } from '../../address.mapper';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';
import { addressProps } from '../testing/mocks';

describe('AddressMapper', () => {
  describe('toWS', () => {
    it('should map AddressEntity to WsAddress without complement', () => {
      const addressEntity = new AddressEntity(addressProps);

      const mapper = new AddressMapper(addressEntity);
      const result = mapper.toWS();

      expect(result).toEqual({
        Endereco: {
          Endereco: addressProps.address,
          Numero: addressProps.number,
          Bairro: addressProps.neighborhood,
          CodigoMunicipio: addressProps.municipalityCode,
          Uf: addressProps.state,
          Cep: addressProps.postalCode,
        },
      });
    });

    it('should map AddressEntity to WsAddress with complement', () => {
      const addressEntity = new AddressEntity({
        ...addressProps,
        complement: 'Apto 101',
      });

      const mapper = new AddressMapper(addressEntity);
      const result = mapper.toWS();

      expect(result).toEqual({
        Endereco: {
          Endereco: addressProps.address,
          Numero: addressProps.number,
          Bairro: addressProps.neighborhood,
          CodigoMunicipio: addressProps.municipalityCode,
          Uf: addressProps.state,
          Cep: addressProps.postalCode,
          Complemento: addressEntity.complement,
        },
      });
    });
  });
});
