import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { FiscalEmitterOutputMapper } from '../../fiscal-emitter-output.dto';

describe('FiscalEmitterOutputMapper End-to-End Tests', () => {
  it('should map a FiscalEmitterEntity to a FiscalEmitterOutputDto in a realistic flow', () => {
    const fiscalEmitterData = {
      name: 'Real Test Company',
      document: '987654321',
      email: 'real@company.com',
      nickname: 'RealNick',
      address: '123 Main St',
      number: '101',
      complement: 'Suite 200',
      neighborhood: 'Downtown',
      state: 'CA',
      cityCode: 12345,
      zipCode: '12345-678',
      crt: 'CRT999',
      ie: 'IE999',
      im: 'IM999',
      cnaeCode: '6201-5/01',
      activityCode: '54321',
      aliquot: 4.5,
      iss: 3.5,
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-02T10:00:00Z'),
    };

    const entity = new FiscalEmitterEntity(fiscalEmitterData, '10');

    const output = FiscalEmitterOutputMapper.toOutput(entity);

    expect(output).toEqual({
      id: '10',
      name: 'Real Test Company',
      document: '987654321',
      email: 'real@company.com',
      nickname: 'RealNick',
      address: '123 Main St',
      number: '101',
      complement: 'Suite 200',
      neighborhood: 'Downtown',
      state: 'CA',
      cityCode: 12345,
      zipCode: '12345-678',
      crt: 'CRT999',
      ie: 'IE999',
      im: 'IM999',
      cnaeCode: '6201-5/01',
      activityCode: '54321',
      aliquot: 4.5,
      iss: 3.5,
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-02T10:00:00Z'),
    });
  });
});
