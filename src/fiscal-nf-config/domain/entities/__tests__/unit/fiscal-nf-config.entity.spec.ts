import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalNfConfigEntity } from '../../fiscal-nf-config.entity';

describe('FiscalNfConfigEntity', () => {
  const validProps = {
    serie: '12345',
    nextDocumentNumber: 1000,
    simpleNational: false,
    taxationRegime: '1',
    emitterId: 'valid-emitter-id',
  };

  it('should create a valid FiscalNfConfigEntity', () => {
    const entity = new FiscalNfConfigEntity(validProps);

    expect(entity).toBeInstanceOf(FiscalNfConfigEntity);
    expect(entity.serie).toBe(validProps.serie);
    expect(entity.nextDocumentNumber).toBe(validProps.nextDocumentNumber);
    expect(entity.simpleNational).toBe(validProps.simpleNational);
    expect(entity.taxationRegime).toBe(validProps.taxationRegime);
    expect(entity.emitterId).toBe(validProps.emitterId);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if required properties are missing', () => {
    const invalidProps = { ...validProps, serie: undefined };

    expect(() => new FiscalNfConfigEntity(invalidProps as any)).toThrow(
      EntityValidationError,
    );
  });

  it('should update properties and update the updatedAt timestamp', () => {
    const entity = new FiscalNfConfigEntity(validProps);
    const originalUpdatedAt = entity.updatedAt;

    entity.update({ serie: '54321', simpleNational: true });

    expect(entity.serie).toBe('54321');
    expect(entity.simpleNational).toBe(true);
    expect(entity.updatedAt).not.toBe(originalUpdatedAt);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should not allow updating the createdAt property', () => {
    const entity = new FiscalNfConfigEntity(validProps);
    const originalCreatedAt = entity.createdAt;

    entity.update({ createdAt: new Date('2000-01-01') });

    expect(entity.createdAt).toBe(originalCreatedAt);
  });

  it('should throw an error when trying to update with invalid data', () => {
    const entity = new FiscalNfConfigEntity(validProps);

    expect(() =>
      entity.update({ nextDocumentNumber: 'invalid-number' as any }),
    ).toThrow(EntityValidationError);
  });

  it('should create a valid entity with default timestamps', () => {
    const entity = new FiscalNfConfigEntity({
      serie: '67890',
      nextDocumentNumber: 2000,
      taxationRegime: '6',
      emitterId: 'another-valid-emitter-id',
    });

    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });
});
