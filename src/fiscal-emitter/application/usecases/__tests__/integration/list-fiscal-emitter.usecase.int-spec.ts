import { PrismaClient } from '@prisma/client';
import { FiscalEmitterPrismaRepository } from '@/fiscal-emitter/infrastructure/database/prisma/repositories/fiscal-emitter-prisma.repository';
import {
  ListFiscalEmitterInput,
  ListFiscalEmitterUseCase,
} from '../../list-fiscal-emitter.usecase';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';

const prisma = new PrismaClient();

describe('ListFiscalEmitterUseCase Integration Tests', () => {
  let prisma: PrismaClient;
  let repository: FiscalEmitterPrismaRepository;
  let useCase: ListFiscalEmitterUseCase;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    repository = new FiscalEmitterPrismaRepository(prisma as PrismaService);
    useCase = new ListFiscalEmitterUseCase(repository);
  });

  beforeEach(async () => {
    await prisma.fiscalEmitter.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should list all fiscal emitters with pagination', async () => {
    const mockEmitters = [
      {
        id: '1',
        name: 'Company A',
        document: '111111111',
        address: 'Address 1',
        number: '10',
        complement: 'Suite 100',
        neighborhood: 'Neighborhood 1',
        state: 'State 1',
        city_code: 123,
        zip_code: '12345-000',
        crt: 'CRT001',
        ie: 'IE001',
        im: 'IM001',
        cnae_code: '12345',
        activity_code: '67890',
        aliquot: 5.0,
        iss: 2.0,
        email: 'a@company.com',
        nickname: 'ACompany',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2',
        name: 'Company B',
        document: '222222222',
        address: 'Address 2',
        number: '20',
        complement: 'Suite 200',
        neighborhood: 'Neighborhood 2',
        state: 'State 2',
        city_code: 456,
        zip_code: '12345-111',
        crt: 'CRT002',
        ie: 'IE002',
        im: 'IM002',
        cnae_code: '54321',
        activity_code: '09876',
        aliquot: 7.0,
        iss: 3.0,
        email: 'b@company.com',
        nickname: 'BCompany',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await prisma.fiscalEmitter.createMany({
      data: mockEmitters,
    });

    const input: ListFiscalEmitterInput = {
      page: 1,
      perPage: 10,
      sort: 'name',
      sortDir: 'asc' as SortDirection,
      filter: '',
    };

    const result = await useCase.execute(input);

    expect(result.items).toHaveLength(2);
    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '1',
          name: 'Company A',
        }),
        expect.objectContaining({
          id: '2',
          name: 'Company B',
        }),
      ]),
    );

    expect(result.total).toBe(2);
    expect(result.currentPage).toBe(1);
    expect(result.perPage).toBe(10);
  });

  it('should return an empty list when no fiscal emitters are present', async () => {
    const input: ListFiscalEmitterInput = {
      page: 1,
      perPage: 10,
      sort: 'name',
      sortDir: 'asc' as SortDirection,
      filter: '',
    };

    const result = await useCase.execute(input);

    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.currentPage).toBe(1);
    expect(result.perPage).toBe(10);
  });
});
