import { PrismaClient } from '@prisma/client';
import { FiscalEmitterPrismaRepository } from '@/fiscal-emitter/infrastructure/database/prisma/repositories/fiscal-emitter-prisma.repository';
import { UpdateFiscalEmitterUseCase } from '../../update-fiscal-emitter.usecase';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/prisma/prisma.service';

describe('UpdateFiscalEmitterUseCase Integration Tests', () => {
  let prisma: PrismaClient;
  let repository: FiscalEmitterPrismaRepository;
  let useCase: UpdateFiscalEmitterUseCase;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    repository = new FiscalEmitterPrismaRepository(prisma as PrismaService);
    useCase = new UpdateFiscalEmitterUseCase(repository);
  });

  beforeEach(async () => {
    await prisma.fiscalEmitter.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should update a fiscal emitter successfully', async () => {
    const mockEmitter = await prisma.fiscalEmitter.create({
      data: {
        id: '123',
        name: 'Original Company',
        document: '123456789',
        address: 'Main St',
        number: '10',
        complement: 'Suite 200',
        neighborhood: 'Downtown',
        state: 'CA',
        city_code: 12345,
        zip_code: '12345-678',
        crt: 'CRT001',
        ie: 'IE001',
        im: 'IM001',
        cnae_code: '6201-5/00',
        activity_code: '12345',
        aliquot: 5.5,
        iss: 2.0,
        email: 'original@company.com',
        nickname: 'OriginalNick',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    const input = {
      id: mockEmitter.id,
      name: 'Updated Company',
      address: 'New Address',
      number: '20',
      email: 'updated@company.com',
    };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: mockEmitter.id,
      name: 'Updated Company',
      document: mockEmitter.document,
      address: 'New Address',
      number: '20',
      complement: mockEmitter.complement,
      neighborhood: mockEmitter.neighborhood,
      state: mockEmitter.state,
      cityCode: mockEmitter.city_code,
      zipCode: mockEmitter.zip_code,
      crt: mockEmitter.crt,
      ie: mockEmitter.ie,
      im: mockEmitter.im,
      cnaeCode: mockEmitter.cnae_code,
      activityCode: mockEmitter.activity_code,
      aliquot: mockEmitter.aliquot,
      iss: mockEmitter.iss,
      email: 'updated@company.com',
      nickname: mockEmitter.nickname,
      createdAt: mockEmitter.created_at,
      updatedAt: expect.any(Date),
    });

    const updatedEmitter = await prisma.fiscalEmitter.findUnique({
      where: { id: mockEmitter.id },
    });

    expect(updatedEmitter).toMatchObject({
      name: 'Updated Company',
      address: 'New Address',
      number: '20',
      email: 'updated@company.com',
    });
  });

  it('should throw NotFoundError if fiscal emitter is not found', async () => {
    const input = {
      id: 'non-existing-id',
      name: 'Updated Company',
    };

    await expect(useCase.execute(input)).rejects.toThrow(NotFoundError);
  });
});
