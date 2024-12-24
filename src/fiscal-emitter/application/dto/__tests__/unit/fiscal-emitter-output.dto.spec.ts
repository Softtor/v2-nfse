import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import {
  FiscalEmitterOutputDto,
  FiscalEmitterOutputMapper,
} from '../../fiscal-emitter-output.dto';

describe('FiscalEmitterOutputMapper Unit Tests', () => {
  const mockDate = new Date('2024-12-12T18:05:11.085Z');

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should map a FiscalEmitterEntity to a FiscalEmitterOutputDto', () => {
    const entity = new FiscalEmitterEntity(
      {
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
      },
      '1',
    );

    const output = FiscalEmitterOutputMapper.toOutput(entity);

    expect(output).toEqual({
      id: '1',
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
      aliquot: 5,
      iss: 2,
      createdAt: mockDate,
      updatedAt: mockDate,
    });
  });
});
