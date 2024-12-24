import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import {
  FiscalServiceEntity,
  FiscalServiceProps,
} from '../../fiscal-service.entity';

describe('FiscalServiceEntity Integration Tests', () => {
  const validProps: FiscalServiceProps = {
    serviceValue: 150.0,
    deductionValue: 15.0,
    pisValue: 1.5,
    cofinsValue: 3.0,
    inssValue: 2.0,
    irValue: 1.0,
    csllValue: 2.5,
    otherRetentions: 1.0,
    totalTributesValue: 6.0,
    issValue: 8.0,
    rate: 0.05,
    nbsCode: '123456',
    unconditionalDiscount: 10.0,
    conditionalDiscount: 5.0,
    issWithheld: 1,
    serviceItemList: 'item1,item2,item3',
    cnaeCode: '001',
    municipalTaxationCode: 'MT001',
    serviceDescription: 'Test Service Description',
    municipalityCode: '456',
    issExigibility: 1,
    incidenceMunicipality: '123',
    externalPlanCode: 'PLAN123',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  };

  it('should create a valid FiscalServiceEntity', () => {
    const entity = new FiscalServiceEntity(validProps);

    expect(entity).toBeInstanceOf(FiscalServiceEntity);
    expect(entity.serviceValue).toBe(validProps.serviceValue);
    expect(entity.deductionValue).toBe(validProps.deductionValue);
    expect(entity.pisValue).toBe(validProps.pisValue);
    expect(entity.conditionalDiscount).toBe(validProps.conditionalDiscount);
    expect(entity.serviceDescription).toBe(validProps.serviceDescription);
    expect(entity.createdAt).toEqual(new Date('2024-01-01T00:00:00Z'));
    expect(entity.updatedAt).toEqual(new Date('2024-01-01T00:00:00Z'));
  });

  it('should update properties and validate successfully', () => {
    const entity = new FiscalServiceEntity(validProps);
    const updatedProps = {
      serviceValue: 200.0,
      serviceDescription: 'Updated Service Description',
    };

    entity.update(updatedProps);

    expect(entity.serviceValue).toBe(200.0);
    expect(entity.serviceDescription).toBe('Updated Service Description');
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should retain createdAt and update updatedAt when updating', () => {
    const entity = new FiscalServiceEntity(validProps);

    entity.update({ serviceDescription: 'Another Update' });

    expect(entity.createdAt).toEqual(new Date('2024-01-01T00:00:00Z'));
    expect(entity.updatedAt).not.toEqual(new Date('2024-01-01T00:00:00Z'));
    expect(entity.serviceDescription).toBe('Another Update');
  });

  it('should create a valid entity with default timestamps', () => {
    const propsWithoutTimestamps: FiscalServiceProps = {
      ...validProps,
      createdAt: undefined,
      updatedAt: undefined,
    };

    const entity = new FiscalServiceEntity(propsWithoutTimestamps);

    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should handle optional fields correctly', () => {
    const propsWithoutOptional: FiscalServiceProps = {
      ...validProps,
      cofinsValue: undefined,
      inssValue: undefined,
      irValue: undefined,
      csllValue: undefined,
      externalPlanCode: undefined,
    };

    const entity = new FiscalServiceEntity(propsWithoutOptional);

    expect(entity.cofinsValue).toBeUndefined();
    expect(entity.inssValue).toBeUndefined();
    expect(entity.irValue).toBeUndefined();
    expect(entity.csllValue).toBeUndefined();
    expect(entity.externalPlanCode).toBeUndefined();
  });

  it('should generate unique IDs when not provided', () => {
    const entity1 = new FiscalServiceEntity(validProps);
    const entity2 = new FiscalServiceEntity(validProps);

    expect(entity1.id).not.toBe(entity2.id);
  });
});
