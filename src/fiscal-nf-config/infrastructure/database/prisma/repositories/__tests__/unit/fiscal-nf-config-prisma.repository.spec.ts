import { PrismaClient } from '@prisma/client';
import { createPrismaMock } from '@/shared/prisma/__tests__/__mocks__/prisma.service.mock';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalNfConfigPrismaRepository } from '../../fiscal-nf-config-prisma.repository';

describe('FiscalNfConfigPrismaRepository unit test', () => {
  let prismaMock: jest.Mocked<PrismaClient>;
  let repository: FiscalNfConfigPrismaRepository;

  beforeEach(() => {
    prismaMock = createPrismaMock();
    repository = new FiscalNfConfigPrismaRepository(prismaMock as any);
  });

  it('should find by emitter ID', async () => {
    const mockEmitterId = 'valid-emitter-id';
    const mockModel = {
      id: '1',
      serie: '12345',
      next_document_number: 100,
      simple_national: true,
      taxation_regime: '1',
      emitter_id: mockEmitterId,
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(prismaMock.fiscalNfConfig, 'findFirst')
      .mockResolvedValueOnce(mockModel as any);

    const result = await repository.findByEmitterId(mockEmitterId);

    expect(prismaMock.fiscalNfConfig.findFirst).toHaveBeenCalledWith({
      where: { emitter_id: mockEmitterId },
    });
    expect(result.serie).toBe('12345');
  });

  it('should throw NotFoundError when no record exists for emitter ID', async () => {
    jest.spyOn(prismaMock.fiscalNfConfig, 'findFirst').mockResolvedValue(null);

    await expect(repository.findByEmitterId('non-existent-id')).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should insert a new FiscalNfConfig', async () => {
    const entity = new FiscalNfConfigEntity({
      serie: '54321',
      nextDocumentNumber: 200,
      simpleNational: false,
      taxationRegime: '2',
      emitterId: 'valid-emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (prismaMock.fiscalNfConfig.create as jest.Mock).mockResolvedValueOnce({
      ...entity.props,
      created_at: entity.props.createdAt,
      updated_at: entity.props.updatedAt,
      id: entity.id,
    });

    await repository.insert(entity);

    expect(prismaMock.fiscalNfConfig.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        id: entity.id,
        serie: entity.props.serie,
        next_document_number: entity.props.nextDocumentNumber,
        simple_national: entity.props.simpleNational,
        taxation_regime: entity.props.taxationRegime,
        emitter: { connect: { id: entity.props.emitterId } },
        created_at: entity.props.createdAt,
        updated_at: entity.props.updatedAt,
      }),
    });
  });

  it('should update an existing FiscalNfConfig', async () => {
    const entity = new FiscalNfConfigEntity(
      {
        serie: '12345',
        nextDocumentNumber: 300,
        simpleNational: true,
        taxationRegime: '3',
        emitterId: 'valid-emitter-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      '1',
    );

    (prismaMock.fiscalNfConfig.update as jest.Mock).mockResolvedValueOnce({
      ...entity.props,
      created_at: entity.props.createdAt,
      updated_at: entity.props.updatedAt,
      id: entity.id,
    });

    await repository.update(entity);

    expect(prismaMock.fiscalNfConfig.update).toHaveBeenCalledWith({
      where: { id: entity.id },
      data: expect.objectContaining({
        serie: entity.props.serie,
        next_document_number: entity.props.nextDocumentNumber,
        simple_national: entity.props.simpleNational,
        taxation_regime: entity.props.taxationRegime,
        emitter: { connect: { id: entity.props.emitterId } },
        updated_at: entity.props.updatedAt,
      }),
    });
  });
});
