import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalTakerEntity, FiscalTakerProps } from '../../fiscal-taker.entity';

describe('FiscalTakerEntity', () => {
  const validProps: FiscalTakerProps = {
    document: '12345678900',
    name: 'John Doe',
    address: '123 Main St',
    number: '45A',
    neighborhood: 'Downtown',
    cityCode: 12345,
    state: 'PR',
    zipCode: '12345-678',
    isForeign: false,
    countryCode: 'BR',
    phone: '1234567890',
    email: 'john.doe@example.com',
    createdAt: new Date('2024-12-01T10:00:00Z'),
    updatedAt: new Date('2024-12-01T10:00:00Z'),
  };

  it('should create a valid FiscalTakerEntity', () => {
    const entity = new FiscalTakerEntity(validProps);

    expect(entity).toBeInstanceOf(FiscalTakerEntity);
    expect(entity.document).toBe(validProps.document);
    expect(entity.name).toBe(validProps.name);
    expect(entity.address).toBe(validProps.address);
    expect(entity.number).toBe(validProps.number);
    expect(entity.neighborhood).toBe(validProps.neighborhood);
    expect(entity.cityCode).toBe(validProps.cityCode);
    expect(entity.state).toBe(validProps.state);
    expect(entity.zipCode).toBe(validProps.zipCode);
    expect(entity.isForeign).toBe(validProps.isForeign);
    expect(entity.countryCode).toBe(validProps.countryCode);
    expect(entity.phone).toBe(validProps.phone);
    expect(entity.email).toBe(validProps.email);
    expect(entity.createdAt).toEqual(new Date('2024-12-01T10:00:00Z'));
    expect(entity.updatedAt).toEqual(new Date('2024-12-01T10:00:00Z'));
  });

  it('should throw an error for invalid document', () => {
    const invalidProps = { ...validProps, document: '' };

    expect(() => new FiscalTakerEntity(invalidProps)).toThrow(
      EntityValidationError,
    );
  });

  it('should update properties and validate successfully', () => {
    const entity = new FiscalTakerEntity(validProps);
    const updatedProps = {
      name: 'Jane Doe',
      phone: '9876543210',
      email: 'jane.doe@example.com',
    };

    entity.update(updatedProps);

    expect(entity.name).toBe('Jane Doe');
    expect(entity.phone).toBe('9876543210');
    expect(entity.email).toBe('jane.doe@example.com');
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should retain createdAt and update updatedAt when updating', () => {
    const entity = new FiscalTakerEntity(validProps);

    entity.update({ name: 'Updated Name' });

    expect(entity.createdAt).toEqual(new Date('2024-12-01T10:00:00Z'));
    expect(entity.updatedAt).not.toEqual(new Date('2024-12-01T10:00:00Z'));
    expect(entity.name).toBe('Updated Name');
  });

  it('should create a valid entity with default timestamps', () => {
    const propsWithoutTimestamps: FiscalTakerProps = {
      ...validProps,
      createdAt: undefined,
      updatedAt: undefined,
    };

    const entity = new FiscalTakerEntity(propsWithoutTimestamps);

    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should handle optional fields correctly', () => {
    const propsWithoutOptional: FiscalTakerProps = {
      ...validProps,
      complement: undefined,
      countryCode: undefined,
      phone: undefined,
      email: undefined,
    };

    const entity = new FiscalTakerEntity(propsWithoutOptional);

    expect(entity.complement).toBeUndefined();
    expect(entity.countryCode).toBeUndefined();
    expect(entity.phone).toBeUndefined();
    expect(entity.email).toBeUndefined();
  });

  it('should throw an error when updating with invalid data', () => {
    const entity = new FiscalTakerEntity(validProps);

    expect(() => entity.update({ state: '' })).toThrow(EntityValidationError);
    expect(() => entity.update({ cityCode: -1 })).toThrow(
      EntityValidationError,
    );
  });
});
