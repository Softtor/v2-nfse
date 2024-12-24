import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalEmitterOutputDto } from '@/fiscal-emitter/application/dto/fiscal-emitter-output.dto';
import { UpdateFiscalEmitterUseCase } from '../../update-fiscal-emitter.usecase';

describe('UpdateFiscalEmitterUseCase Unit Tests', () => {
  let useCase: UpdateFiscalEmitterUseCase;
  let repository: jest.Mocked<FiscalEmitterRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;
    useCase = new UpdateFiscalEmitterUseCase(repository);
  });

  it('should update a fiscal emitter and return the updated DTO', async () => {
    const id = '123';
    const existingEntity = new FiscalEmitterEntity(
      {
        name: 'Original Company',
        document: '123456789',
        email: 'original@company.com',
        nickname: 'OriginalNick',
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
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-01T00:00:00Z'),
      },
      id,
    );

    repository.findById.mockResolvedValueOnce(existingEntity);

    const updateInput = {
      id,
      name: 'Updated Company',
      email: 'updated@company.com',
      address: '456 Elm St',
      aliquot: 10.0,
    };

    const result = await useCase.execute(updateInput);

    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(repository.update).toHaveBeenCalledWith(existingEntity);
    expect(result).toEqual<FiscalEmitterOutputDto>({
      id,
      name: 'Updated Company',
      document: existingEntity.document,
      email: 'updated@company.com',
      nickname: existingEntity.nickname,
      address: '456 Elm St',
      number: existingEntity.number,
      complement: existingEntity.complement,
      neighborhood: existingEntity.neighborhood,
      state: existingEntity.state,
      cityCode: existingEntity.cityCode,
      zipCode: existingEntity.zipCode,
      crt: existingEntity.crt,
      ie: existingEntity.ie,
      im: existingEntity.im,
      cnaeCode: existingEntity.cnaeCode,
      activityCode: existingEntity.activityCode,
      aliquot: 10.0,
      iss: existingEntity.iss,
      createdAt: existingEntity.createdAt,
      updatedAt: existingEntity.updatedAt,
    });
  });

  it('should throw NotFoundError if fiscal emitter is not found', async () => {
    const id = 'not-existing-id';

    repository.findById.mockResolvedValueOnce(null);

    await expect(
      useCase.execute({ id, name: 'Updated Company' }),
    ).rejects.toThrow(NotFoundError);

    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(repository.update).not.toHaveBeenCalled();
  });
});
