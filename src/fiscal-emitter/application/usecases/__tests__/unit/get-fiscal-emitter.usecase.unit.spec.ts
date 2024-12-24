import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalEmitterOutputDto } from '@/fiscal-emitter/application/dto/fiscal-emitter-output.dto';
import { GetFiscalEmitterUseCase } from '../../get-fiscal-emitter.usecase';

describe('GetFiscalEmitterUseCase Unit Tests', () => {
  let useCase: GetFiscalEmitterUseCase;
  let repository: jest.Mocked<FiscalEmitterRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;
    useCase = new GetFiscalEmitterUseCase(repository);
  });

  it('should return a fiscal emitter by ID', async () => {
    const id = '123';
    const entity = new FiscalEmitterEntity(
      {
        name: 'Test Company',
        document: '123456789',
        email: 'test@company.com',
        nickname: 'TestNick',
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
        aliquot: 5.5,
        iss: 2.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    repository.findById.mockResolvedValueOnce(entity);

    const result = await useCase.execute({ id });

    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual<FiscalEmitterOutputDto>({
      id: entity.id,
      name: 'Test Company',
      document: '123456789',
      email: 'test@company.com',
      nickname: 'TestNick',
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
      aliquot: 5.5,
      iss: 2.0,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  });

  it('should throw NotFoundError if fiscal emitter is not found', async () => {
    const id = 'not-existing-id';

    repository.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute({ id })).rejects.toThrow(NotFoundError);
    expect(repository.findById).toHaveBeenCalledWith(id);
  });
});
