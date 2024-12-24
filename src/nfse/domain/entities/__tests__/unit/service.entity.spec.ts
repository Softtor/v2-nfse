import { ServiceEntity, ServiceProps } from '../../service.entity';
import { EntityValidationError } from '../../../../../shared/domain/errors/validation-error';

describe('ServiceEntity Unit Tests', () => {
  let validProps: ServiceProps;

  beforeEach(() => {
    validProps = {
      serviceValue: 1000,
      deductionValue: 100,
      pisValue: 10,
      cofinsValue: 20,
      inssValue: 30,
      irValue: 40,
      csllValue: 50,
      otherRetentions: 60,
      totalTributesValue: 70,
      issValue: 80,
      rate: 5,
      nbsCode: '1234',
      unconditionalDiscount: 0,
      conditionalDiscount: 0,
      issWithheld: 0,
      serviceItemList: 'item1',
      cnaeCode: '5678',
      municipalTaxationCode: '91011',
      serviceDescription: 'Test Service',
      municipalityCode: '12345',
      issExigibility: 1,
      incidenceMunicipality: 'Test City',
    };
  });

  it('should create a valid ServiceEntity', () => {
    const serviceEntity = new ServiceEntity(validProps);
    expect(serviceEntity).toBeInstanceOf(ServiceEntity);
    expect(serviceEntity.csllValue).toBe(validProps.csllValue);
  });

  it('should throw validation error when csllValue is invalid', () => {
    validProps.csllValue = -10; // Invalid value
    expect(() => new ServiceEntity(validProps)).toThrow(EntityValidationError);
  });

  it('should set and get csllValue correctly', () => {
    const serviceEntity = new ServiceEntity(validProps);
    serviceEntity.csllValue = 60;
    expect(serviceEntity.csllValue).toBe(60);
  });
});
