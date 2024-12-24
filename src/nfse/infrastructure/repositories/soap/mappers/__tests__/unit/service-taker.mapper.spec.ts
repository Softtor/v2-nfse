import { ServiceTakerMapper } from '../../service-taker.mapper';
import { ServiceTakerEntity } from '@/nfse/domain/entities/service-taker.entity';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';
import { AddressMapper } from '../../address.mapper';
import { address } from '../testing/mocks';

describe('ServiceTakerMapper', () => {
  let addressEntity: AddressEntity;
  beforeEach(() => {
    addressEntity = new AddressEntity(address);
  });
  it('should map ServiceTakerEntity to WsServiceTaker correctly', () => {
    const serviceTakerEntity = new ServiceTakerEntity({
      cnpj: '12345678000195',
      businessName: 'Test Business',
      address,
      phone: '1234567890',
      email: 'test@example.com',
    });

    const mapper = new ServiceTakerMapper(serviceTakerEntity);
    const wsServiceTaker = mapper.toWS();
    const addressMapper = new AddressMapper(addressEntity);
    expect(wsServiceTaker).toEqual({
      TomadorServico: {
        IdentificacaoTomador: {
          CpfCnpj: {
            Cnpj: '12345678000195',
          },
        },
        RazaoSocial: 'Test Business',
        Endereco: addressMapper.toWS().Endereco,
        Contato: {
          Telefone: '1234567890',
          Email: 'test@example.com',
        },
      },
    });
  });

  it('should throw an error if address is missing', () => {
    const serviceTakerEntity = new ServiceTakerEntity({
      cnpj: '12345678000195',
      businessName: 'Test Business',
      address: null,
      phone: '1234567890',
      email: 'test@example.com',
    });

    const mapper = new ServiceTakerMapper(serviceTakerEntity);

    expect(() => mapper.toWS()).toThrow('Address is required');
  });

  it('should map ServiceTakerEntity with only Cpf correctly', () => {
    let serviceTakerEntity: ServiceTakerEntity;
    try {
      serviceTakerEntity = new ServiceTakerEntity({
        cpf: '92756801089',
        businessName: 'Test Business',
        address,
        phone: '1234567890',
        email: 'test@example.com',
      });
    } catch (err) {
      console.log(err, 'Error creating ServiceTakerEntity');
      throw new Error('Error creating ServiceTakerEntity');
    }

    const mapper = new ServiceTakerMapper(serviceTakerEntity);
    const wsServiceTaker = mapper.toWS();

    expect(wsServiceTaker).toEqual({
      TomadorServico: {
        IdentificacaoTomador: {
          CpfCnpj: {
            Cpf: '92756801089',
          },
        },
        RazaoSocial: 'Test Business',
        Endereco: new AddressMapper(addressEntity).toWS().Endereco,
        Contato: {
          Telefone: '1234567890',
          Email: 'test@example.com',
        },
      },
    });
  });

  it('should map ServiceTakerEntity without phone and email correctly', () => {
    const serviceTakerEntity = new ServiceTakerEntity({
      cnpj: '12345678000195',
      businessName: 'Test Business',
      address,
    });

    const mapper = new ServiceTakerMapper(serviceTakerEntity);
    const wsServiceTaker = mapper.toWS();

    expect(wsServiceTaker).toEqual({
      TomadorServico: {
        IdentificacaoTomador: {
          CpfCnpj: {
            Cnpj: serviceTakerEntity.cnpj,
          },
        },
        RazaoSocial: serviceTakerEntity.businessName,
        Endereco: new AddressMapper(
          new AddressEntity(serviceTakerEntity.address),
        ).toWS().Endereco,
      },
    });
  });
});
