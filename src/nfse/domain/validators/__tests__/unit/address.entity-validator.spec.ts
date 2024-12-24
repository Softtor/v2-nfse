import {
  AddressEntityValidatorFactory,
  AddressEntityValidator,
} from '../../address.entity-validator';
import { AddressProps } from '../../../entities/address.entity';

describe('AddressEntityValidator', () => {
  let validator: AddressEntityValidator;

  beforeEach(() => {
    validator = AddressEntityValidatorFactory.create();
  });

  it('should invalidate an address with missing required fields', () => {
    const invalidAddress: Partial<AddressProps> = {
      address: '', // Missing address
      number: '', // Missing number
      neighborhood: '', // Missing neighborhood
      municipalityCode: '', // Missing municipalityCode
      state: '', // Missing state
      postalCode: '', // Missing postalCode
    };

    const isValid = validator.validate(invalidAddress as AddressProps);
    expect(isValid).toBe(false);
    expect(validator.errors).not.toBeNull();
    expect(validator.errors.address).toContain('Address is required');
    expect(validator.errors.number).toContain('Number is required');
    expect(validator.errors.neighborhood).toContain('Neighborhood is required');
    expect(validator.errors.municipalityCode).toContain(
      'Municipality Code is required',
    );
    expect(validator.errors.state).toContain('State is required');
    expect(validator.errors.postalCode).toContain('Postal Code is required');
  });

  it('should validate a correct address', () => {
    const validAddress: AddressProps = {
      address: 'Example Street',
      number: '123',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'SP',
      postalCode: '12345-678',
      complement: 'Apt 101',
    };

    const isValid = validator.validate(validAddress);
    expect(isValid).toBe(true);
    expect(validator.errors).toBeNull();
  });

  it('should invalidate an address with invalid state format', () => {
    const invalidAddress: AddressProps = {
      address: 'Example Street',
      number: '123',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'S', // Invalid state
      postalCode: '12345-678',
    };

    const isValid = validator.validate(invalidAddress);
    expect(isValid).toBe(false);
    expect(validator.errors.state).toContain(
      'State must contain 2 uppercase letters',
    );
  });

  it('should invalidate an address with invalid postal code format (missing dash)', () => {
    const invalidAddress: AddressProps = {
      address: 'Example Street',
      number: '123',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'SP',
      postalCode: '12345678', // Invalid postal code (missing dash)
    };

    const isValid = validator.validate(invalidAddress);
    expect(isValid).toBe(false);
    expect(validator.errors.postalCode).toContain(
      'Postal Code must be in the format 00000-000',
    );
  });

  it('should invalidate an address with invalid postal code format (wrong pattern)', () => {
    const invalidAddress: AddressProps = {
      address: 'Example Street',
      number: '123',
      neighborhood: 'Downtown',
      municipalityCode: '1234567',
      state: 'SP',
      postalCode: '66666666', // Invalid postal code (non-numeric)
    };

    const isValid = validator.validate(invalidAddress);
    expect(isValid).toBe(false);
    expect(validator.errors.postalCode).toContain(
      'Postal Code must be in the format 00000-000',
    );
  });

  it('should invalidate an address with municipality code exceeding max length', () => {
    const invalidAddress: AddressProps = {
      address: 'Example Street',
      number: '123',
      neighborhood: 'Downtown',
      municipalityCode: '12345678', // Exceeds max length of 7
      state: 'SP',
      postalCode: '12345-678',
    };

    const isValid = validator.validate(invalidAddress);
    expect(isValid).toBe(false);
    expect(validator.errors.municipalityCode).toContain(
      'Municipality Code must have at most 7 characters',
    );
  });

  // Add more test cases as needed
});
