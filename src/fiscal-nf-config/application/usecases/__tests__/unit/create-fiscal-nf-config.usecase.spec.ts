import { FiscalNfConfigRepository } from '@/fiscal-nf-config/domain/repositories/fiscal-nf-config.repository';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { FiscalNfConfigOutputDto } from '@/fiscal-nf-config/application/dto/fiscal-nf-config-output.dto';
import { CreateFiscalNfConfigUseCase } from '../../create-fiscal-nf-config.usecase';

describe('CreateFiscalNfConfigUseCase Unit Tests', () => {
  let useCase: CreateFiscalNfConfigUseCase;
  let repository: jest.Mocked<FiscalNfConfigRepository>;

  beforeEach(() => {
    repository = {
      insert: jest.fn(),
      findByEmitterId: jest.fn(),
      findById: jest.fn(),
    } as any;
    useCase = new CreateFiscalNfConfigUseCase(repository);
  });

  it('should create a new FiscalNfConfig and return the correct output DTO', async () => {
    const input = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
    };

    const fixedDate = new Date('2024-12-12T12:00:00Z');
    jest.useFakeTimers().setSystemTime(fixedDate);

    const mockId = 'new-config-id';
    const mockEntity = new FiscalNfConfigEntity(
      {
        ...input,
        createdAt: fixedDate,
        updatedAt: fixedDate,
      },
      mockId,
    );

    jest
      .spyOn(FiscalNfConfigEntity.prototype, 'id', 'get')
      .mockReturnValueOnce(mockId);

    repository.insert.mockResolvedValueOnce(undefined);

    const result = await useCase.execute(input);

    expect(repository.insert).toHaveBeenCalledWith(
      expect.any(FiscalNfConfigEntity),
    );
    expect(result).toEqual<FiscalNfConfigOutputDto>({
      id: mockId,
      serie: input.serie,
      nextDocumentNumber: input.nextDocumentNumber,
      simpleNational: input.simpleNational,
      taxationRegime: input.taxationRegime,
      emitterId: input.emitterId,
      createdAt: fixedDate,
      updatedAt: fixedDate,
    });
  });

  it('should throw ConflictError if a FiscalNfConfig with the same serie already exists', async () => {
    const input = {
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'valid-emitter-id',
    };

    repository.insert.mockRejectedValueOnce(
      new ConflictError('A FiscalNfConfig with this serie already exists.'),
    );

    await expect(useCase.execute(input)).rejects.toThrow(ConflictError);

    expect(repository.insert).toHaveBeenCalledWith(
      expect.any(FiscalNfConfigEntity),
    );
  });
});
