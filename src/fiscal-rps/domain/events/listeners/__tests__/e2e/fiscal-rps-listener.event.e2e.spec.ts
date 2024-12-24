import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FiscalRpsModule } from '@/fiscal-rps/fiscal-rps.module';
import {
  CreateFiscalRpsDTO,
  UpdateFiscalRpsDTO,
} from '@/fiscal-rps/application/dtos/fiscal-data-input.dto';
import { v4 as uuidv4 } from 'uuid';

describe('FiscalRpsListener (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let eventEmitter: EventEmitter2;
  let service: any;
  let taker: any;
  let provider: any;
  let createRpsDto: CreateFiscalRpsDTO;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FiscalRpsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    eventEmitter = app.get<EventEmitter2>(EventEmitter2);

    await app.init();

    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  afterEach(async () => {
    await prisma.fiscalRps.deleteMany();
    await prisma.fiscalService.deleteMany();
    await prisma.fiscalTaker.deleteMany();
    await prisma.fiscalProvider.deleteMany();
    await prisma.fiscalEmitter.deleteMany();
    await prisma.fiscalBatchNfse.deleteMany();
  });

  beforeEach(async () => {
    const uniqueDocument = `${uuidv4()}`;
    const emitter = await prisma.fiscalEmitter.create({
      data: {
        name: 'Test Emitter',
        document: uniqueDocument,
        email: 'emitter@example.com',
        nickname: 'TestNick',
        address: '123 Emitter St',
        number: '100',
        complement: 'Suite 200',
        neighborhood: 'Emitter Neighborhood',
        state: 'PR',
        city_code: 12345,
        zip_code: '12345-678',
        crt: '1',
        ie: 'IE123456',
        im: 'IM123456',
        cnae_code: 'CNAE1234',
        activity_code: 'ACT1234',
        aliquot: 5.5,
        iss: 2.2,
      },
    });

    provider = await prisma.fiscalProvider.create({
      data: {
        cnpj: emitter.document,
        inscricao_municipal: emitter.im,
        emitter_id: emitter.id,
      },
    });

    service = await prisma.fiscalService.create({
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
        created_at: new Date(),
        external_plan_code: 'external-plan-code',
      },
    });

    taker = await prisma.fiscalTaker.create({
      data: {
        document: '12345678900',
        name: 'John Doe',
        address: '123 Main St',
        number: '45A',
        neighborhood: 'Downtown',
        city_code: 12345,
        state: 'PR',
        zip_code: '12345-678',
        is_foreign: false,
        phone: '1234567890',
        email: 'john.doe@example.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    createRpsDto = {
      rps: {
        number: 123,
        series: 'A1',
        type: 'RPS',
        status: 'NORMAL',
        serviceId: service.id,
        takerId: taker.id,
        providerId: provider.id,
        batchId: null,
      },
      service: {
        id: service.id,
        serviceValue: service.service_value,
        deductionValue: service.deduction_value,
        pisValue: service.pis_value,
        cofinsValue: service.cofins_value,
        inssValue: service.inss_value,
        irValue: service.ir_value,
        csllValue: service.csll_value,
        otherRetentions: service.other_retentions,
        totalTributesValue: service.total_tributes_value,
        unconditionalDiscount: service.unconditional_discount,
        conditionalDiscount: service.conditional_discount,
        issWithheld: service.iss_withheld,
        serviceItemList: service.service_item_list,
        cnaeCode: service.cnae_code,
        municipalTaxationCode: service.municipal_taxation_code,
        serviceDescription: service.service_description,
        municipalityCode: service.municipality_code,
        issExigibility: service.iss_exigibility,
        incidenceMunicipality: service.incidence_municipality,
        createdAt: service.created_at,
        externalPlanCode: service.external_plan_code,
      },
      taker: {
        id: taker.id,
        document: taker.document,
        name: taker.name,
        address: taker.address,
        number: taker.number,
        complement: taker.complement,
        neighborhood: taker.neighborhood,
        cityCode: taker.city_code,
        state: taker.state,
        zipCode: taker.zip_code,
        isForeign: taker.is_foreign,
        countryCode: taker.country_code,
        phone: taker.phone,
        email: taker.email,
        createdAt: taker.created_at,
        updatedAt: taker.updated_at,
      },
    };
  });

  it('should handle fiscal-service-and-taker.get', async () => {
    const takerAndService = await eventEmitter.emitAsync(
      'fiscal-service-and-taker.get',
      createRpsDto,
    );

    expect(takerAndService).toHaveLength(1);
    expect(takerAndService[0]).toMatchObject({
      taker: expect.objectContaining({
        document: '12345678900',
        name: 'John Doe',
      }),
      service: expect.objectContaining({
        serviceValue: 100.0,
        municipalTaxationCode: 'ABC',
      }),
    });
  });

  it('should handle fiscal-rps.create', async () => {
    await eventEmitter.emitAsync('fiscal-rps.create', createRpsDto);

    const createdRps = await prisma.fiscalRps.findMany({
      where: {
        number: 123,
        series: 'A1',
      },
    });

    expect(createdRps).toHaveLength(1);
    expect(createdRps[0]).toMatchObject({
      number: 123,
      series: 'A1',
      batch_id: null,
    });
  });

  it('should handle fiscal-rps.findAllByCreatedAt', async () => {
    const createdAt = new Date();
    await eventEmitter.emitAsync('fiscal-rps.create', createRpsDto);
    const foundRps = await prisma.fiscalRps.findMany({
      where: {
        created_at: {
          gte: new Date(createdAt.setHours(0, 0, 0, 0)),
          lt: new Date(createdAt.setHours(23, 59, 59, 999)),
        },
      },
    });

    expect(foundRps).toHaveLength(1);
    expect(foundRps[0]).toMatchObject({
      number: 123,
      series: 'A1',
      batch_id: null,
    });
    console.log('Found RPS:', foundRps);
  });
  it('should handle fiscal-rps.update', async () => {
    const createdRps = await prisma.fiscalRps.create({
      data: {
        number: 123,
        series: 'A1',
        type: 'RPS',
        status: 'NORMAL',
        service_id: service.id,
        taker_id: taker.id,
        provider_id: provider.id,
        batch_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    const updateRpsDto: UpdateFiscalRpsDTO = {
      id: createdRps.id,
      batchId: null,
    };

    await eventEmitter.emitAsync('fiscal-rps.update', updateRpsDto);

    const updatedRps = await prisma.fiscalRps.findUnique({
      where: { id: createdRps.id },
    });

    expect(updatedRps).toMatchObject({
      id: createdRps.id,
      batch_id: null,
    });
  });
});
