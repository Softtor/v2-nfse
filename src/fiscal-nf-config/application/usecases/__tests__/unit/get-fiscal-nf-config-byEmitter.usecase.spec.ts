import { FiscalNfConfigRepository } from '@/fiscal-nf-config/domain/repositories/fiscal-nf-config.repository';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { GetFiscalNfConfigsByEmitterUseCase } from '../../get-fiscal-nf-config-byEmitter.usecase';

describe('GetFiscalNfConfigsByEmitterUseCase', () => {
  let useCase: GetFiscalNfConfigsByEmitterUseCase;
  let repository: jest.Mocked<FiscalNfConfigRepository>;

  beforeEach(() => {
    repository = {
      findByEmitterId: jest.fn(),
    } as unknown as jest.Mocked<FiscalNfConfigRepository>;

    useCase = new GetFiscalNfConfigsByEmitterUseCase(repository);
  });

  it('should return an array of FiscalNfConfigOutputDto when configs are found', async () => {
    const emitterId = 'valid-emitter-id';
    const mockConfigs = new FiscalNfConfigEntity(
      {
        serie: '12345',
        nextDocumentNumber: 1000,
        simpleNational: true,
        taxationRegime: '1',
        emitterId,
        createdAt: new Date('2024-01-01T10:00:00Z'),
        updatedAt: new Date('2024-01-02T10:00:00Z'),
      },
      'config-id-1',
    );

    repository.findByEmitterId.mockResolvedValue(mockConfigs);

    const result = await useCase.execute(emitterId);

    expect(result).toEqual({
      id: 'config-id-1',
      serie: '12345',
      nextDocumentNumber: 1000,
      simpleNational: true,
      taxationRegime: '1',
      emitterId,
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-02T10:00:00Z'),
    });
  });

  it('should throw NotFoundError when no configs are found', async () => {
    const emitterId = 'non-existent-emitter-id';
    repository.findByEmitterId.mockResolvedValue(null);

    await expect(useCase.execute(emitterId)).rejects.toThrow(
      new NotFoundError('No FiscalNfConfig found for this emitter.'),
    );

    expect(repository.findByEmitterId).toHaveBeenCalledWith(emitterId);
  });
});
