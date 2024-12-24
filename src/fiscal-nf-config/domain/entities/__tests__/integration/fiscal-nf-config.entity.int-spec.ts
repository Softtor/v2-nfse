import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import {
  FiscalNfConfigEntity,
  FiscalNfConfigProps,
} from '../../fiscal-nf-config.entity';

describe('FiscalNfConfigEntity Integration Tests', () => {
  it('should create a valid FiscalNfConfigEntity', () => {
    const props: FiscalNfConfigProps = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = new FiscalNfConfigEntity(props);

    expect(entity).toBeInstanceOf(FiscalNfConfigEntity);
    expect(entity.serie).toBe(props.serie);
    expect(entity.nextDocumentNumber).toBe(props.nextDocumentNumber);
    expect(entity.simpleNational).toBe(props.simpleNational);
    expect(entity.taxationRegime).toBe(props.taxationRegime);
    expect(entity.emitterId).toBe(props.emitterId);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error for invalid taxationRegime', () => {
    const props: FiscalNfConfigProps = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: 'invalid',
      emitterId: 'valid-emitter-id',
    };

    expect(() => new FiscalNfConfigEntity(props)).toThrow(
      EntityValidationError,
    );
  });

  it('should update properties and validate successfully', () => {
    const props: FiscalNfConfigProps = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = new FiscalNfConfigEntity(props);
    const originalUpdatedAt = entity.updatedAt;

    entity.update({
      serie: '54321',
      simpleNational: false,
      taxationRegime: '2',
    });

    expect(entity.serie).toBe('54321');
    expect(entity.simpleNational).toBe(false);
    expect(entity.taxationRegime).toBe('2');
    expect(entity.updatedAt).not.toBe(originalUpdatedAt);
  });

  it('should throw an error when updating with invalid taxationRegime', () => {
    const props: FiscalNfConfigProps = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
    };

    const entity = new FiscalNfConfigEntity(props);

    expect(() => entity.update({ taxationRegime: 'invalid' })).toThrow(
      EntityValidationError,
    );
  });

  it('should retain createdAt and update updatedAt when updating', () => {
    const props: FiscalNfConfigProps = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-01T00:00:00Z'),
    };

    const entity = new FiscalNfConfigEntity(props);

    entity.update({ serie: '54321' });

    expect(entity.createdAt).toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(entity.updatedAt).not.toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(entity.serie).toBe('54321');
  });

  it('should create a valid entity with default timestamps', () => {
    const props: FiscalNfConfigProps = {
      serie: '67890',
      nextDocumentNumber: 2000,
      taxationRegime: '3',
      emitterId: 'another-valid-emitter-id',
    };

    const entity = new FiscalNfConfigEntity(props);

    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });
});
