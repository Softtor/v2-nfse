import { FiscalNfConfigRepository } from '@/fiscal-nf-config/domain/repositories/fiscal-nf-config.repository';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalNfConfigOutputDto } from '@/fiscal-nf-config/application/dto/fiscal-nf-config-output.dto';
import { UpdateFiscalNfConfigUseCase } from '../../update-fiscal-nf-config.usecase';

describe('UpdateFiscalNfConfigUseCase Unit Tests', () => {
  let useCase: UpdateFiscalNfConfigUseCase;
  let repository: jest.Mocked<FiscalNfConfigRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;
    useCase = new UpdateFiscalNfConfigUseCase(repository);
  });

  it('should update an existing FiscalNfConfig and return the correct output DTO', async () => {
    const input = {
      id: 'existing-config-id',
      serie: '54321',
      nextDocumentNumber: 2000,
      simpleNational: false,
      taxationRegime: '2',
    };

    const fixedDate = new Date('2024-12-12T12:00:00Z');
    jest.useFakeTimers().setSystemTime(fixedDate);

    const existingEntity = new FiscalNfConfigEntity(
      {
        serie: '12345',
        nextDocumentNumber: 1000,
        simpleNational: true,
        taxationRegime: '1',
        emitterId: 'valid-emitter-id',
        createdAt: new Date('2024-01-01T10:00:00Z'),
        updatedAt: new Date('2024-01-01T10:00:00Z'),
      },
      input.id,
    );

    repository.findById.mockResolvedValueOnce(existingEntity);
    repository.update.mockResolvedValueOnce(undefined);

    const result = await useCase.execute(input);

    expect(repository.findById).toHaveBeenCalledWith(input.id);
    expect(repository.update).toHaveBeenCalledWith(
      expect.any(FiscalNfConfigEntity),
    );
    expect(result).toEqual<FiscalNfConfigOutputDto>({
      id: input.id,
      serie: input.serie,
      nextDocumentNumber: input.nextDocumentNumber,
      simpleNational: input.simpleNational,
      taxationRegime: input.taxationRegime,
      emitterId: 'valid-emitter-id',
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: fixedDate,
    });
  });

  it('should throw NotFoundError if the FiscalNfConfig is not found', async () => {
    const input = {
      id: 'non-existent-config-id',
      serie: '54321',
    };

    repository.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError('FiscalNfConfig not found.'),
    );

    expect(repository.findById).toHaveBeenCalledWith(input.id);
    expect(repository.update).not.toHaveBeenCalled();
  });
});
