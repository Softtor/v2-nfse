import { FiscalEmitterEntity } from '../../fiscal-emitter.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

describe('FiscalEmitterEntity Unit Tests', () => {
  const validProps = {
    name: 'Company X',
    document: '123456789',
    email: 'email@example.com',
    nickname: 'CompX',
    address: '123 Main St',
    number: '101',
    complement: 'Suite 200',
    neighborhood: 'Downtown',
    state: 'CA',
    cityCode: 12345,
    zipCode: '12345-678',
    crt: 'CRT001',
    ie: 'IE001',
    im: 'IM001',
    cnaeCode: '6201-5/00',
    activityCode: '12345',
    aliquot: 5.0,
    iss: 2.0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create a valid FiscalEmitterEntity', () => {
    const entity = new FiscalEmitterEntity(validProps);
    expect(entity).toBeDefined();
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
    expect(entity.name).toBe(validProps.name);
    expect(entity.address).toBe(validProps.address);
    expect(entity.number).toBe(validProps.number);
  });

  it('should update properties correctly', () => {
    const entity = new FiscalEmitterEntity(validProps);
    const newValues = { name: 'Company Y', iss: 3.0, address: '456 Elm St' };

    entity.update(newValues);

    expect(entity.name).toBe(newValues.name);
    expect(entity.iss).toBe(newValues.iss);
    expect(entity.address).toBe(newValues.address);
    expect(entity.updatedAt).not.toEqual(entity.createdAt);
  });

  it('should not allow updating createdAt', () => {
    const entity = new FiscalEmitterEntity(validProps);
    const originalCreatedAt = entity.createdAt;

    entity.update({ createdAt: new Date('2000-01-01') } as any);

    expect(entity.createdAt).toEqual(originalCreatedAt);
  });

  it('should validate updated properties', () => {
    const entity = new FiscalEmitterEntity(validProps);

    expect(() => entity.update({ name: '' })).toThrow(EntityValidationError);
    expect(() => entity.update({ address: '' })).toThrow(EntityValidationError);
    expect(() => entity.update({ number: '' })).toThrow(EntityValidationError);
  });
});
