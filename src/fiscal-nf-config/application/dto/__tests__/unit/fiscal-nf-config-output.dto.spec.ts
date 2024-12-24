import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import {
  FiscalNfConfigOutputDto,
  FiscalNfConfigOutputMapper,
} from '../../fiscal-nf-config-output.dto';

describe('FiscalNfConfigOutputMapper', () => {
  it('should map a FiscalNfConfigEntity to FiscalNfConfigOutputDto', () => {
    const entity = new FiscalNfConfigEntity(
      {
        serie: '12345',
        nextDocumentNumber: 1000,
        simpleNational: true,
        taxationRegime: '1',
        emitterId: 'valid-emitter-id',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-02T00:00:00Z'),
      },
      'entity-id',
    );

    const output: FiscalNfConfigOutputDto =
      FiscalNfConfigOutputMapper.toOutput(entity);

    expect(output).toEqual({
      id: 'entity-id',
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    });
  });

  it('should handle optional fields correctly', () => {
    const entity = new FiscalNfConfigEntity(
      {
        serie: '54321',
        nextDocumentNumber: 2000,
        taxationRegime: '2',
        emitterId: 'another-valid-emitter-id',
      },
      'optional-entity-id',
    );

    const output: FiscalNfConfigOutputDto =
      FiscalNfConfigOutputMapper.toOutput(entity);

    expect(output).toEqual({
      id: 'optional-entity-id',
      serie: '54321',
      nextDocumentNumber: 2000,
      simpleNational: undefined,
      taxationRegime: '2',
      emitterId: 'another-valid-emitter-id',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  });
});
