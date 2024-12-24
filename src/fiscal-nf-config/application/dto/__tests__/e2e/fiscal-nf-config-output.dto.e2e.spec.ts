import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { FiscalNfConfigOutputMapper } from '../../fiscal-nf-config-output.dto';

describe('FiscalNfConfigOutputMapper End-to-End Tests', () => {
  it('should map a FiscalNfConfigEntity to a FiscalNfConfigOutputDto in a realistic flow', () => {
    const fiscalNfConfigData = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-02T10:00:00Z'),
    };

    const entity = new FiscalNfConfigEntity(fiscalNfConfigData, 'entity-id');

    const output = FiscalNfConfigOutputMapper.toOutput(entity);

    expect(output).toEqual({
      id: 'entity-id',
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-02T10:00:00Z'),
    });
  });
});
