import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalRpsEntity, FiscalRpsProps } from '../../fiscal-rps.entity';

describe('FiscalRpsEntity Integration Tests', () => {
  it('should create a valid FiscalRpsEntity', () => {
    const props: FiscalRpsProps = {
      number: 101,
      series: 'A',
      type: 'RPS',
      status: 'NORMAL',
      serviceId: 'valid-service-id',
      takerId: 'valid-taker-id',
      competence: new Date('2024-12-01T00:00:00Z'),
      complementaryInformation: 'Information',
      createdAt: new Date('2024-12-10T10:00:00Z'),
      updatedAt: new Date('2024-12-10T10:00:00Z'),
    };

    const entity = new FiscalRpsEntity(props);

    expect(entity).toBeInstanceOf(FiscalRpsEntity);
    expect(entity.number).toBe(props.number);
    expect(entity.series).toBe(props.series);
    expect(entity.type).toBe(props.type);
    expect(entity.status).toBe(props.status);
    expect(entity.serviceId).toBe(props.serviceId);
    expect(entity.takerId).toBe(props.takerId);
    expect(entity.competence).toEqual(props.competence);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error for invalid type', () => {
    const props: FiscalRpsProps = {
      number: 101,
      series: 'A',
      type: 'INVALID_TYPE',
      status: 'NORMAL',
      serviceId: 'valid-service-id',
      takerId: 'valid-taker-id',
    };

    expect(() => new FiscalRpsEntity(props)).toThrow(EntityValidationError);
  });

  it('should update properties and validate successfully', () => {
    const props: FiscalRpsProps = {
      number: 101,
      series: 'A',
      type: 'RPS',
      status: 'NORMAL',
      serviceId: 'valid-service-id',
      takerId: 'valid-taker-id',
      createdAt: new Date('2024-12-10T10:00:00Z'),
      updatedAt: new Date('2024-12-10T10:00:00Z'),
    };

    const entity = new FiscalRpsEntity(props);
    const originalUpdatedAt = entity.updatedAt;

    entity.update({
      series: 'B',
      status: 'CANCELADO',
    });

    expect(entity.series).toBe('B');
    expect(entity.status).toBe('CANCELADO');
    expect(entity.updatedAt).not.toBe(originalUpdatedAt);
  });

  it('should throw an error when updating with invalid status', () => {
    const props: FiscalRpsProps = {
      number: 101,
      series: 'A',
      type: 'RPS',
      status: 'NORMAL',
      serviceId: 'valid-service-id',
      takerId: 'valid-taker-id',
    };

    const entity = new FiscalRpsEntity(props);

    expect(() => entity.update({ status: 'INVALID_STATUS' })).toThrow(
      EntityValidationError,
    );
  });

  it('should retain createdAt and update updatedAt when updating', () => {
    const props: FiscalRpsProps = {
      number: 101,
      series: 'A',
      type: 'RPS',
      status: 'NORMAL',
      serviceId: 'valid-service-id',
      takerId: 'valid-taker-id',
      createdAt: new Date('2024-12-01T00:00:00Z'),
      updatedAt: new Date('2024-12-01T00:00:00Z'),
    };

    const entity = new FiscalRpsEntity(props);

    entity.update({ series: 'B' });

    expect(entity.createdAt).toEqual(new Date('2024-12-01T00:00:00Z'));
    expect(entity.updatedAt).not.toEqual(new Date('2024-12-01T00:00:00Z'));
    expect(entity.series).toBe('B');
  });

  it('should create a valid entity with default timestamps', () => {
    const props: FiscalRpsProps = {
      number: 101,
      series: 'A',
      type: 'RPS',
      status: 'NORMAL',
      serviceId: 'valid-service-id',
      takerId: 'valid-taker-id',
    };

    const entity = new FiscalRpsEntity(props);

    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should handle optional fields correctly', () => {
    const props: FiscalRpsProps = {
      number: 101,
      series: 'A',
      type: 'RPS',
      status: 'NORMAL',
      serviceId: 'valid-service-id',
      takerId: 'valid-taker-id',
    };

    const entity = new FiscalRpsEntity(props);

    expect(entity.providerId).toBeUndefined();
    expect(entity.batchId).toBeUndefined();
    expect(entity.issueDateRps).toBeUndefined();
    expect(entity.complementaryInformation).toBeUndefined();
  });
});
