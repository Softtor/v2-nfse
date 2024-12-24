import {
  FiscalEmitterValidator,
  FiscalEmitterValidatorFactory,
} from '@/fiscal-emitter/domain/validators/fiscal-emitter.validator';
import { FiscalEmitterEntity } from '../../fiscal-emitter.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

describe('FiscalEmitterEntity Integration Tests', () => {
  it('should validate properties during creation', () => {
    const mockValidator = new FiscalEmitterValidator();
    const spyValidate = jest
      .spyOn(mockValidator, 'validate')
      .mockReturnValue(true);

    jest
      .spyOn(FiscalEmitterValidatorFactory, 'create')
      .mockReturnValue(mockValidator);

    const props = {
      name: 'Company X',
      document: '123456789',
      email: 'email@example.com',
      nickname: 'CompX',
      address: '123 Main St',
      number: '101',
      complement: 'Suite 200',
      neighborhood: 'Downtown',
      state: 'CA',
      cityCode: 12345,
      zipCode: '12345-678',
      crt: 'CRT001',
      ie: 'IE001',
      im: 'IM001',
      cnaeCode: '6201-5/00',
      activityCode: '12345',
      aliquot: 5.0,
      iss: 2.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = new FiscalEmitterEntity(props);

    expect(spyValidate).toHaveBeenCalledWith(props);
    expect(entity).toBeDefined();
  });

  it('should validate properties during update', () => {
    const mockValidator = new FiscalEmitterValidator();

    jest.spyOn(mockValidator, 'validate').mockImplementation((data) => {
      if (data.name === '') {
        mockValidator.errors = { name: ['name should not be empty'] };
        return false;
      }
      return true;
    });

    jest
      .spyOn(FiscalEmitterValidatorFactory, 'create')
      .mockReturnValue(mockValidator);

    const props = {
      name: 'Company X',
      document: '123456789',
      email: 'email@example.com',
      nickname: 'CompX',
      address: '123 Main St',
      number: '101',
      complement: 'Suite 200',
      neighborhood: 'Downtown',
      state: 'CA',
      cityCode: 12345,
      zipCode: '12345-678',
      crt: 'CRT001',
      ie: 'IE001',
      im: 'IM001',
      cnaeCode: '6201-5/00',
      activityCode: '12345',
      aliquot: 5.0,
      iss: 2.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = new FiscalEmitterEntity(props);

    expect(() => entity.update({ name: '' })).toThrow(EntityValidationError);

    entity.update({
      name: 'Updated Company A',
      email: 'updated_email@example.com',
      aliquot: 8.0,
      iss: 2.0,
    });

    expect(entity.name).toBe('Updated Company A');
    expect(entity.email).toBe('updated_email@example.com');
    expect(entity.aliquot).toBe(8.0);
    expect(entity.iss).toBe(2.0);
  });
});
