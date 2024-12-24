import { AddressEntity } from '../../address.entity';
import { EntityValidationError } from '../../../../../shared/domain/errors/validation-error';

describe('AddressEntity Unit Tests', () => {
  it('should create an AddressEntity with valid properties', () => {
    const props = {
      address: '123 Main St',
      number: '456',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'CA',
      postalCode: '12345-678',
    };
    const address = new AddressEntity(props);
    expect(address.address).toBe(props.address);
    expect(address.number).toBe(props.number);
    expect(address.neighborhood).toBe(props.neighborhood);
    expect(address.municipalityCode).toBe(props.municipalityCode);
    expect(address.state).toBe(props.state);
    expect(address.postalCode).toBe(props.postalCode);
  });

  it('should throw an error when creating an AddressEntity with invalid properties', () => {
    const props = {
      address: '123 Main St',
      number: '',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'CA',
      postalCode: '12345-678',
    };
    expect(() => new AddressEntity(props)).toThrow(EntityValidationError);
  });

  it('should update the number property and validate', () => {
    const props = {
      address: '123 Main St',
      number: '456',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'CA',
      postalCode: '12345-678',
    };
    const address = new AddressEntity(props);
    address.number = '789';
    expect(address.number).toBe('789');
  });

  it('should throw an error when updating the number property with an invalid value', () => {
    const props = {
      address: '123 Main St',
      number: '456',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'CA',
      postalCode: '12345-678',
    };
    const address = new AddressEntity(props);
    expect(() => {
      address.number = '';
    }).toThrow(EntityValidationError);
  });
});
