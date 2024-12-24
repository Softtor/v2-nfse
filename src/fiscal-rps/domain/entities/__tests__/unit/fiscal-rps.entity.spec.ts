import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalRpsEntity, FiscalRpsProps } from '../../fiscal-rps.entity';

describe('FiscalRpsEntity', () => {
  const validProps: FiscalRpsProps = {
    number: 101,
    series: 'A',
    type: 'RPS',
    status: 'NORMAL',
    serviceId: 'service-id-1',
    takerId: 'taker-id-1',
    competence: new Date('2024-12-01T00:00:00Z'),
    complementaryInformation: 'Information',
    createdAt: new Date('2024-12-10T10:00:00Z'),
    updatedAt: new Date('2024-12-10T10:00:00Z'),
  };

  it('should create a valid FiscalRpsEntity', () => {
    const entity = new FiscalRpsEntity(validProps);
    expect(entity.id).toBeDefined();
    expect(entity.props).toMatchObject(validProps);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw validation error when required fields are missing', () => {
    expect(() => {
      new FiscalRpsEntity({ ...validProps, series: '' });
    }).toThrow(EntityValidationError);

    expect(() => {
      new FiscalRpsEntity({ ...validProps, type: 'INVALID_TYPE' });
    }).toThrow(EntityValidationError);
  });

  it('should update properties and validate them', () => {
    const entity = new FiscalRpsEntity(validProps);
    const updatedProps = {
      series: 'B',
      batchId: 'batch-id-1',
      issueDateRps: new Date('2024-12-12T00:00:00Z'),
    };

    entity.update(updatedProps);

    expect(entity.series).toBe('B');
    expect(entity.batchId).toBe('batch-id-1');
    expect(entity.issueDateRps).toEqual(new Date('2024-12-12T00:00:00Z'));
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should not allow createdAt to be updated', () => {
    const entity = new FiscalRpsEntity(validProps);
    const previousCreatedAt = entity.createdAt;

    entity.update({ createdAt: new Date('2024-12-20T00:00:00Z') });
    expect(entity.createdAt).toEqual(previousCreatedAt);
  });

  it('should maintain default values for optional fields', () => {
    const propsWithDefaults = {
      ...validProps,
      batchId: undefined,
      issueDateRps: undefined,
    };

    const entity = new FiscalRpsEntity(propsWithDefaults);

    expect(entity.batchId).toBeUndefined();
    expect(entity.issueDateRps).toBeUndefined();
  });

  it('should generate unique IDs when not provided', () => {
    const entity1 = new FiscalRpsEntity(validProps);
    const entity2 = new FiscalRpsEntity(validProps);

    expect(entity1.id).not.toBe(entity2.id);
  });
});
