import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { FiscalEmitterPrismaRepository } from '../../fiscal-emitter-prisma.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/prisma/prisma.service';

describe('FiscalEmitter E2E Tests', () => {
  let prisma: PrismaService;
  let repository: FiscalEmitterPrismaRepository;

  beforeAll(async () => {
    prisma = new PrismaService({
      datasources: { db: { url: 'file:memory:?cache=shared' } },
    });
    repository = new FiscalEmitterPrismaRepository(prisma);

    await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON');
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.fiscalEmitter.deleteMany();
  });

  it('should insert, update, and delete a fiscal emitter', async () => {
    const entity = new FiscalEmitterEntity({
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
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repository.insert(entity);
    const inserted = await repository.findByDocument('123456789');
    expect(inserted.name).toBe('Test Company');

    entity.update({ name: 'Updated Company' });
    await repository.update(entity);
    const updated = await repository.findByDocument('123456789');
    expect(updated.name).toBe('Updated Company');

    await repository.delete(entity.id);
    await expect(repository.findByDocument('123456789')).rejects.toThrow(
      NotFoundError,
    );
  });
});
