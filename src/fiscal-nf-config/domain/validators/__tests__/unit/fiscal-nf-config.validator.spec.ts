import { FiscalNfConfigProps } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { FiscalNfConfigValidator } from '../../fiscal-nf-config.validator';

describe('FiscalNfConfigValidator', () => {
  let validator: FiscalNfConfigValidator;

  beforeEach(() => {
    validator = new FiscalNfConfigValidator();
  });

  it('should validate a valid FiscalNfConfigProps object', () => {
    const validProps: FiscalNfConfigProps = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: false,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(validProps);

    expect(isValid).toBe(true);
    expect(validator.errors).toBeNull();
  });

  it('should invalidate when serie is missing', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      nextDocumentNumber: 1000,
      simpleNational: false,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('serie');
  });

  it('should invalidate when nextDocumentNumber is not a number', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      serie: '12345',
      nextDocumentNumber: 'not-a-number' as unknown as number,
      simpleNational: false,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('nextDocumentNumber');
  });

  it('should invalidate when taxationRegime is missing', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: false,
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('taxationRegime');
  });

  it('should invalidate when taxationRegime is not a valid number', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: false,
      taxationRegime: 'invalid',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('taxationRegime');
  });

  it('should invalidate when emitterId is missing', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: false,
      taxationRegime: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('emitterId');
  });

  it('should invalidate when simpleNational is not a boolean', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: 'not-a-boolean' as unknown as boolean,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('simpleNational');
  });

  it('should invalidate when createdAt is not a date', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: false,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: 'not-a-date' as unknown as Date,
      updatedAt: new Date(),
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('createdAt');
  });

  it('should invalidate when updatedAt is not a date', () => {
    const invalidProps: Partial<FiscalNfConfigProps> = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: false,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: 'not-a-date' as unknown as Date,
    };

    const isValid = validator.validate(invalidProps as FiscalNfConfigProps);

    expect(isValid).toBe(false);
    expect(validator.errors).toHaveProperty('updatedAt');
  });
});
