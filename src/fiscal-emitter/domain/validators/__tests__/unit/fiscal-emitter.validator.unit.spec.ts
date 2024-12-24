import {
  FiscalEmitterRules,
  FiscalEmitterValidator,
} from '../../fiscal-emitter.validator';

describe('FiscalEmitterValidator Unit Tests', () => {
  let validator: FiscalEmitterValidator;

  beforeEach(() => {
    validator = new FiscalEmitterValidator();
  });

  it('should validate a valid FiscalEmitterRules object', () => {
    const validData: FiscalEmitterRules = {
      name: 'Valid Company',
      document: '123456789',
      email: 'test@valid.com',
      nickname: 'ValidNick',
      address: '123 Main St',
      number: '45',
      complement: 'Apt 2',
      neighborhood: 'Downtown',
      state: 'SP',
      cityCode: 12345,
      zipCode: '12345-678',
      crt: 'CRT001',
      ie: 'IE001',
      im: 'IM001',
      cnaeCode: '6201-5/00',
      activityCode: '12345',
      aliquot: 5.5,
      iss: 2.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(validData);

    console.log(validator.errors);
    expect(isValid).toBe(true);
    expect(validator.errors).toBeNull();
  });

  it('should return false for missing required fields', () => {
    const invalidData = {
      document: '123456789',
      cnaeCode: '6201-5/00',
      activityCode: '12345',
      aliquot: 5.5,
      iss: 2.0,
    } as any;

    const isValid = validator.validate(invalidData);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('name');
    expect(validator.errors.name).toContain('name should not be empty');
    expect(validator.errors).toHaveProperty('address');
    expect(validator.errors.address).toContain('address must be a string');
    expect(validator.errors).toHaveProperty('number');
    expect(validator.errors.number).toContain('number must be a string');
  });

  it('should return false for invalid email format', () => {
    const invalidData: FiscalEmitterRules = {
      name: 'Valid Company',
      document: '123456789',
      email: 'invalid-email',
      nickname: 'ValidNick',
      address: '123 Main St',
      number: '45',
      crt: 'CRT001',
      ie: 'IE001',
      im: 'IM001',
      cnaeCode: '6201-5/00',
      activityCode: '12345',
      aliquot: 5.5,
      iss: 2.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidData);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('email');
    expect(validator.errors.email).toContain('email must be an email');
  });

  it('should return false for invalid dates', () => {
    const invalidData: FiscalEmitterRules = {
      name: 'Valid Company',
      document: '123456789',
      email: 'test@valid.com',
      nickname: 'ValidNick',
      address: '123 Main St',
      number: '45',
      crt: 'CRT001',
      ie: 'IE001',
      im: 'IM001',
      cnaeCode: '6201-5/00',
      activityCode: '12345',
      aliquot: 5.5,
      iss: 2.0,
      createdAt: 'invalid-date' as any,
      updatedAt: 'invalid-date' as any,
    };

    const isValid = validator.validate(invalidData);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('createdAt');
    expect(validator.errors).toHaveProperty('updatedAt');
  });
});
