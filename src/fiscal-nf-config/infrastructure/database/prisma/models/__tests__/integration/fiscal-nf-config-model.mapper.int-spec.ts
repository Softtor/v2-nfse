import { PrismaClient, FiscalNfConfig, taxation_regime } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { FiscalNfConfigModelMapper } from '../../fiscal-nf-config-model.mapper';

describe('FiscalNfConfigModelMapper integration tests', () => {
  let prismaService: PrismaClient;
  let createdEntities: { fiscalNfConfigIds: string[]; emitterIds: string[] };

  beforeAll(async () => {
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(() => {
    createdEntities = { fiscalNfConfigIds: [], emitterIds: [] };
  });

  afterEach(async () => {
    if (createdEntities.fiscalNfConfigIds.length > 0) {
      await prismaService.fiscalNfConfig.deleteMany({
        where: { id: { in: createdEntities.fiscalNfConfigIds } },
      });
    }

    if (createdEntities.emitterIds.length > 0) {
      await prismaService.fiscalEmitter.deleteMany({
        where: { id: { in: createdEntities.emitterIds } },
      });
    }
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when fiscal NF config model is invalid', () => {
    const invalidModel: FiscalNfConfig = {
      id: 'some-id',
      serie: null,
      next_document_number: 100,
      simple_national: true,
      taxation_regime: '1',
      emitter_id: 'valid-emitter-id',
      created_at: new Date(),
      updated_at: new Date(),
    } as any;

    expect(() => FiscalNfConfigModelMapper.toEntity(invalidModel)).toThrow(
      ValidationError,
    );
  });

  it('should convert a fiscal NF config model to a fiscal NF config entity', async () => {
    const emitter = await prismaService.fiscalEmitter.create({
      data: {
        id: 'valid-emitter-id',
        name: 'Valid Emitter',
        document: '123456789',
        address: 'Main St',
        number: '10',
        complement: 'Suite 200',
        neighborhood: 'Downtown',
        state: 'CA',
        city_code: 12345,
        zip_code: '12345-678',
        crt: 'CRT001',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    createdEntities.emitterIds.push(emitter.id);

    const model = await prismaService.fiscalNfConfig.create({
      data: {
        id: 'some-id',
        serie: '12345',
        next_document_number: 100,
        simple_national: true,
        taxation_regime: taxation_regime.MICROEMPRESA_MUNICIPAL,
        emitter: { connect: { id: emitter.id } },
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    createdEntities.fiscalNfConfigIds.push(model.id);

    const entity = FiscalNfConfigModelMapper.toEntity(model);

    expect(entity).toBeInstanceOf(FiscalNfConfigEntity);
    expect(entity.toJSON()).toStrictEqual({
      id: model.id,
      serie: '12345',
      nextDocumentNumber: model.next_document_number,
      simpleNational: model.simple_national,
      taxationRegime: '1',
      emitterId: model.emitter_id,
      createdAt: model.created_at,
      updatedAt: model.updated_at,
    });
  });

  it('should convert a fiscal NF config entity to a Prisma-compatible object', async () => {
    const emitter = await prismaService.fiscalEmitter.create({
      data: {
        id: 'valid-emitter-id',
        name: 'Valid Emitter',
        document: '123456789',
        address: 'Main St',
        number: '10',
        complement: 'Suite 200',
        neighborhood: 'Downtown',
        state: 'CA',
        city_code: 12345,
        zip_code: '12345-678',
        crt: 'CRT001',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    createdEntities.emitterIds.push(emitter.id);

    const entity = new FiscalNfConfigEntity({
      serie: '54321',
      nextDocumentNumber: 200,
      simpleNational: false,
      taxationRegime: '2',
      emitterId: emitter.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const prismaData = FiscalNfConfigModelMapper.toPrisma(entity);

    expect(prismaData).toStrictEqual({
      id: entity.id,
      serie: entity.serie,
      next_document_number: entity.nextDocumentNumber,
      simple_national: entity.simpleNational,
      taxation_regime: taxation_regime.ESTIMATIVA,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      emitter: { connect: { id: entity.emitterId } },
    });
  });
});
