import { PrismaClient } from '@prisma/client';
import { FiscalEmitterPrismaRepository } from '@/fiscal-emitter/infrastructure/database/prisma/repositories/fiscal-emitter-prisma.repository';
import { GetFiscalEmitterUseCase } from '../../get-fiscal-emitter.usecase';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/prisma/prisma.service';

describe('GetFiscalEmitterUseCase Integration Tests', () => {
  let prisma: PrismaClient;
  let repository: FiscalEmitterPrismaRepository;
  let useCase: GetFiscalEmitterUseCase;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    repository = new FiscalEmitterPrismaRepository(prisma as PrismaService);
    useCase = new GetFiscalEmitterUseCase(repository);
  });

  beforeEach(async () => {
    await prisma.fiscalEmitter.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should retrieve a fiscal emitter by ID successfully', async () => {
    const mockEmitter = await prisma.fiscalEmitter.create({
      data: {
        id: '123',
        name: 'Test Company',
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
        email: 'test@company.com',
        nickname: 'TestNick',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    const input = { id: mockEmitter.id };
    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: mockEmitter.id,
      name: mockEmitter.name,
      document: mockEmitter.document,
      address: mockEmitter.address,
      number: mockEmitter.number,
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
      email: mockEmitter.email,
      nickname: mockEmitter.nickname,
      createdAt: mockEmitter.created_at,
      updatedAt: mockEmitter.updated_at,
    });
  });

  it('should throw NotFoundError if fiscal emitter is not found', async () => {
    const input = { id: 'non-existing-id' };

    await expect(useCase.execute(input)).rejects.toThrow(NotFoundError);
  });
});
