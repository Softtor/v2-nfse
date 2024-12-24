import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalNfConfigEntity } from '../../fiscal-nf-config.entity';

describe('FiscalNfConfigEntity End-to-End Tests', () => {
  it('should create, update, and validate an entity lifecycle', () => {
    const props = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = new FiscalNfConfigEntity(props);

    expect(entity).toBeDefined();
    expect(entity.serie).toBe(props.serie);
    expect(entity.nextDocumentNumber).toBe(props.nextDocumentNumber);
    expect(entity.simpleNational).toBe(props.simpleNational);
    expect(entity.taxationRegime).toBe(props.taxationRegime);
    expect(entity.emitterId).toBe(props.emitterId);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);

    const updatedProps = {
      serie: '54321',
      simpleNational: false,
      taxationRegime: '2',
    };
    entity.update(updatedProps);

    expect(entity.serie).toBe(updatedProps.serie);
    expect(entity.simpleNational).toBe(updatedProps.simpleNational);
    expect(entity.taxationRegime).toBe(updatedProps.taxationRegime);

    expect(() => entity.update({ taxationRegime: 'invalid' })).toThrow(
      EntityValidationError,
    );
  });
});
