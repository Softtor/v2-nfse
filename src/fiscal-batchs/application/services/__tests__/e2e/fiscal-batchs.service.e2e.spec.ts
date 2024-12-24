import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FiscalBatchService } from '@/fiscal-batchs/application/services/fiscal-batch/fiscal-batchs.service';
import { FiscalBatchsModule } from '@/fiscal-batchs/fiscal-batchs.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import { v4 as uuidv4 } from 'uuid';
import { BatchRpsService } from '../../fiscal-batch/fiscal-batch-rps.service';
import { BatchProcessService } from '../../fiscal-batch/fiscal-batch-process.service';
import { FiscalBatchNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-bach.entity';
import { BatchProviderService } from '../../fiscal-batch/fiscal-batch-provider.service';

describe('FiscalBatchService (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let eventEmitter: EventEmitter2;
  let batchService: FiscalBatchService;
  let rpsService: BatchRpsService;
  let processService: BatchProcessService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FiscalBatchsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    eventEmitter = app.get<EventEmitter2>(EventEmitter2);
    batchService = app.get<FiscalBatchService>(FiscalBatchService);
    rpsService = app.get<BatchRpsService>(BatchRpsService);
    processService = app.get<BatchProcessService>(BatchProcessService);

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

  it('should process unconfirmed batches and create a new batch if pending RPS exists', async () => {
    const uniqueDocument = `${uuidv4()}`;
    const emitter = await prisma.fiscalEmitter.create({
      data: {
        name: 'Test Emitter',
        document: uniqueDocument,
        email: 'emitter@example.com',
        nickname: 'TestNick',
        address: '123 Emitter St',
        number: '100',
        neighborhood: 'Emitter Neighborhood',
        state: 'PR',
        municipality_code: '12345',
        postal_code: '12345-678',
        city: 'Emitter City',
        crt: '1',
        ie: '987654321',
        im: '010112006414',
        cnae_code: '6202300',
        activity_code: '0107',
        aliquot: 5.5,
        iss: 2.2,
      },
    });

    const provider = await prisma.fiscalProvider.create({
      data: {
        cnpj: emitter.document,
        municipal_subscription: emitter.im,
        emitter_id: emitter.id,
      },
    });

    const service = await prisma.fiscalService.create({
      data: {
        service_value: 100.0,
        deduction_value: 0.0,
        pis_value: 10.0,
        unconditional_discount: 0.0,
        conditional_discount: 0.0,
        iss_withheld: 1,
        service_item_list: '01',
        cnae_code: '123456',
        municipal_taxation_code: 'ABC',
        service_description: 'Sample Service',
        municipality_code: '98765',
        iss_exigibility: 1,
        incidence_municipality: '98765',
      },
    });

    const taker = await prisma.fiscalTaker.create({
      data: {
        document: '12345678900',
        name: 'John Doe',
        address: '123 Main St',
        number: '45A',
        neighborhood: 'Downtown',
        city_code: '12345',
        state: 'PR',
        zip_code: '12345-678',
        is_foreign: false,
        phone: '1234567890',
        email: 'john.doe@example.com',
      },
    });

    const rps = await prisma.fiscalRps.create({
      data: {
        number: 123,
        series: 'A1',
        type: 'RPS',
        status: 'NORMAL',
        service_id: service.id,
        taker_id: taker.id,
        provider_id: provider.id,
        competence: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
    });

    jest
      .spyOn(BatchProviderService.prototype, 'fetchProviderData')
      .mockResolvedValue({
        id: provider.id,
        cnpj: provider.cnpj,
        inscricaoMunicipal: provider.municipal_subscription,
      });

    jest.spyOn(rpsService, 'getRpsByBatchId').mockResolvedValue([
      {
        id: 'rps-id-1',
        providerId: provider.id,
        number: 123,
        series: 'A1',
        type: 'RPS',
        createdAt: new Date(),
      } as unknown as FiscalRpsEntity,
    ]);

    jest.spyOn(processService, 'getUnconfirmedBatches').mockResolvedValue([
      new FiscalBatchNfseEntity({
        confirmedSentWs: false,
        providerId: provider.id,
        sentAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ]);

    const batchOutput = await batchService.handleBatchProcessing();

    expect(batchOutput).toBeDefined();
    expect(batchOutput).toHaveLength(1); // Processed batch
    expect(batchOutput[0].name).toBe('L000001');
  });

  it('should throw NotFoundError if there are no pending RPS and no unconfirmed batches', async () => {
    jest.spyOn(rpsService, 'getPendingRps').mockResolvedValue([]);
    jest.spyOn(processService, 'getUnconfirmedBatches').mockResolvedValue([]);

    await expect(batchService.handleBatchProcessing()).rejects.toThrow(
      NotFoundError,
    );
  });
});
