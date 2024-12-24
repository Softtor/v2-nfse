import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FiscalBatchsModule } from '@/fiscal-batchs/fiscal-batchs.module';
import { FiscalNfseListener } from '../../fiscal-nfse-listener.event';

describe('FiscalNfseListener (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let eventEmitter: EventEmitter2;
  let listener: FiscalNfseListener;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FiscalBatchsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    eventEmitter = app.get<EventEmitter2>(EventEmitter2);
    listener = app.get<FiscalNfseListener>(FiscalNfseListener);

    await app.init();

    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  afterEach(async () => {
    await prisma.fiscalBatchNfse.deleteMany();
    await prisma.fiscalRps.deleteMany();
    await prisma.fiscalService.deleteMany();
    await prisma.fiscalTaker.deleteMany();
    await prisma.fiscalProvider.deleteMany();
    await prisma.fiscalEmitter.deleteMany();
  });

  it('should process the fiscal-nfse.created event', async () => {
    const mockPayload = {
      id: 'mock-nfse-id',
      url: 'http://example.com/nfse',
    };

    const createdSpy = jest.spyOn(listener, 'handleFiscalNfseCreateEvent');

    eventEmitter.emit('fiscal-nfse.created', mockPayload);

    await new Promise(process.nextTick);

    expect(createdSpy).toHaveBeenCalledTimes(1);
    expect(createdSpy).toHaveBeenCalledWith(mockPayload);
  });
});
