import {
  ServiceTakerEntity,
  ServiceTakerProps,
} from '../../service-taker.entity';
import { EntityValidationError } from '../../../../../shared/domain/errors/validation-error';
import { AddressProps } from '../../address.entity';

describe('ServiceTakerEntity Unit Tests', () => {
  let validProps: ServiceTakerProps;
  let address: AddressProps;

  beforeEach(() => {
    address = {
      address: 'Rua Exemplo',
      state: 'SP',
      postalCode: '12345-678',
      neighborhood: 'Bairro Exemplo',
      municipalityCode: '1234567',
      number: '123',
    };
    validProps = {
      businessName: 'Nome da Empresa',
      cpf: '062.286.110-70',
      address,
      phone: '11999999999',
      email: 'exemplo@empresa.com.br',
    };
  });

  it('should create a valid ServiceTakerEntity with CPF', () => {
    const entity = new ServiceTakerEntity(validProps);
    expect(entity).toBeInstanceOf(ServiceTakerEntity);
  });

  it('should create a valid ServiceTakerEntity with CNPJ', () => {
    const props: ServiceTakerProps = {
      businessName: 'Softtor',
      cnpj: '33.779.923/0001-42', // Assuma que este é um CNPJ válido
      address,
      phone: '11999999999',
      email: 'exemplo@empresa.com.br',
    };
    const entity = new ServiceTakerEntity(props);
    expect(entity).toBeInstanceOf(ServiceTakerEntity);
  });

  it('should throw EntityValidationError when both CPF and CNPJ are provided', () => {
    const props: ServiceTakerProps = {
      businessName: 'Nome da Empresa',
      cpf: '123.456.789-09',
      cnpj: '12.345.678/0001-95',
      address,
      phone: '11999999999',
      email: 'exemplo@empresa.com.br',
    };
    expect(() => new ServiceTakerEntity(props)).toThrow(EntityValidationError);
  });

  it('should throw EntityValidationError when neither CPF nor CNPJ is provided', () => {
    const props: ServiceTakerProps = {
      businessName: 'Nome da Empresa',
      address,
      phone: '11999999999',
      email: 'exemplo@empresa.com.br',
    };
    expect(() => new ServiceTakerEntity(props)).toThrow(EntityValidationError);
    // Opcional: Verifique as mensagens de erro
  });

  it('should throw EntityValidationError for invalid CPF format', () => {
    const props: ServiceTakerProps = {
      businessName: 'Nome da Empresa',
      cpf: '123.456.789-00', // CPF inválido
      address,
      phone: '11999999999',
      email: 'exemplo@empresa.com.br',
    };
    expect(() => new ServiceTakerEntity(props)).toThrow(EntityValidationError);
    // Opcional: Verifique as mensagens de erro
  });

  it('should throw EntityValidationError for invalid CNPJ format', () => {
    const props: ServiceTakerProps = {
      businessName: 'Nome da Empresa',
      cnpj: '12.345.678/0001-00', // CNPJ inválido
      address,
      phone: '11999999999',
      email: 'exemplo@empresa.com.br',
    };
    expect(() => new ServiceTakerEntity(props)).toThrow(EntityValidationError);
    // Opcional: Verifique as mensagens de erro
  });

  // Adicione mais casos de teste conforme necessário
});
