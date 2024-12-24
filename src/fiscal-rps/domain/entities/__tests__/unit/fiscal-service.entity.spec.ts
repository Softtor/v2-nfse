import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import {
  FiscalServiceEntity,
  FiscalServiceProps,
} from '../../fiscal-service.entity';

describe('FiscalServiceEntity', () => {
  const validProps: FiscalServiceProps = {
    serviceValue: 100.0,
    deductionValue: 10.0,
    pisValue: 1.0,
    cofinsValue: 2.0,
    inssValue: 3.0,
    irValue: 4.0,
    csllValue: 5.0,
    otherRetentions: 6.0,
    totalTributesValue: 7.0,
    issValue: 8.0,
    rate: 0.1,
    nbsCode: '12345',
    unconditionalDiscount: 0.0,
    conditionalDiscount: 0.0,
    issWithheld: 1,
    serviceItemList: 'item1,item2',
    cnaeCode: '001',
    municipalTaxationCode: 'MT001',
    serviceDescription: 'Service Description',
    municipalityCode: '123',
    issExigibility: 1,
    incidenceMunicipality: '456',
    externalPlanCode: 'EXT123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  it('should create a valid FiscalServiceEntity', () => {
    const entity = new FiscalServiceEntity(validProps);

    expect(entity).toBeInstanceOf(FiscalServiceEntity);
    expect(entity.serviceValue).toBe(validProps.serviceValue);
    expect(entity.deductionValue).toBe(validProps.deductionValue);
    expect(entity.pisValue).toBe(validProps.pisValue);
    expect(entity.cofinsValue).toBe(validProps.cofinsValue);
    expect(entity.inssValue).toBe(validProps.inssValue);
    expect(entity.irValue).toBe(validProps.irValue);
    expect(entity.csllValue).toBe(validProps.csllValue);
    expect(entity.totalTributesValue).toBe(validProps.totalTributesValue);
    expect(entity.nbsCode).toBe(validProps.nbsCode);
    expect(entity.serviceDescription).toBe(validProps.serviceDescription);
    expect(entity.externalPlanCode).toBe(validProps.externalPlanCode);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw validation error for invalid properties', () => {
    expect(() => {
      new FiscalServiceEntity({ ...validProps, serviceValue: -100 });
    }).toThrow(EntityValidationError);
  });

  it('should update properties and validate them', () => {
    const entity = new FiscalServiceEntity(validProps);
    const updatedProps = {
      serviceValue: 200.0,
      issWithheld: 0,
      serviceDescription: 'Updated Service Description',
    };

    entity.update(updatedProps);

    expect(entity.serviceValue).toBe(200.0);
    expect(entity.issWithheld).toBe(0);
    expect(entity.serviceDescription).toBe('Updated Service Description');
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });
  it('should retain createdAt and update updatedAt when updating', () => {
    const entity = new FiscalServiceEntity(validProps);
    const originalCreatedAt = entity.createdAt;
    const originalUpdatedAt = entity.updatedAt;

    // Wait for 1 second to ensure updatedAt will be different
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        entity.update({ serviceValue: 300.0 });
        expect(entity.createdAt).toEqual(originalCreatedAt);
        expect(entity.updatedAt.getTime()).toBeGreaterThan(
          originalUpdatedAt.getTime(),
        );
        expect(entity.serviceValue).toBe(300.0);
        resolve();
      }, 1000);
    });
  });

  it('should handle optional fields correctly', () => {
    const optionalProps: FiscalServiceProps = {
      ...validProps,
      cofinsValue: undefined,
      inssValue: undefined,
      irValue: undefined,
      csllValue: undefined,
    };

    const entity = new FiscalServiceEntity(optionalProps);

    expect(entity.cofinsValue).toBeUndefined();
    expect(entity.inssValue).toBeUndefined();
    expect(entity.irValue).toBeUndefined();
    expect(entity.csllValue).toBeUndefined();
  });

  it('should generate unique IDs when not provided', () => {
    const entity1 = new FiscalServiceEntity(validProps);
    const entity2 = new FiscalServiceEntity(validProps);

    expect(entity1.id).not.toBe(entity2.id);
  });
});
