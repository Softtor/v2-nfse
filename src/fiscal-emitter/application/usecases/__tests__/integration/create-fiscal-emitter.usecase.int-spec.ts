import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { FiscalEmitterPrismaRepository } from '@/fiscal-emitter/infrastructure/database/prisma/repositories/fiscal-emitter-prisma.repository';
import { CreateFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/create-fiscal-emitter.usecase';
import { ConflictError } from '@/shared/domain/errors/conflict-error';

describe('CreateFiscalEmitterUseCase Integration Tests', () => {
  let prisma: PrismaClient;
  let repository: FiscalEmitterPrismaRepository;
  let useCase: CreateFiscalEmitterUseCase;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    repository = new FiscalEmitterPrismaRepository(prisma as PrismaService);
    useCase = new CreateFiscalEmitterUseCase(repository);
  });

  beforeEach(async () => {
    await prisma.fiscalEmitter.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new fiscal emitter successfully', async () => {
    const input = {
      name: 'Test Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
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
      email: 'test@company.com',
      nickname: 'TestNick',
    };

    const result = await useCase.execute(input);

    expect(result).toMatchObject({
      name: input.name,
      document: input.document,
      address: input.address,
      number: input.number,
      complement: input.complement,
      neighborhood: input.neighborhood,
      state: input.state,
      cityCode: input.cityCode,
      zipCode: input.zipCode,
      crt: input.crt,
      ie: input.ie,
      im: input.im,
      cnaeCode: input.cnaeCode,
      activityCode: input.activityCode,
      aliquot: input.aliquot,
      iss: input.iss,
      email: input.email,
      nickname: input.nickname,
    });

    const createdEmitter = await prisma.fiscalEmitter.findUnique({
      where: { document: input.document },
    });

    expect(createdEmitter).not.toBeNull();
    expect(createdEmitter).toMatchObject({
      name: input.name,
      document: input.document,
    });
  });

  it('should throw ConflictError if fiscal emitter with the same document already exists', async () => {
    const input = {
      name: 'Test Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
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
      email: 'test@company.com',
      nickname: 'TestNick',
    };

    await useCase.execute(input);

    await expect(useCase.execute(input)).rejects.toThrow(ConflictError);
  });
});
