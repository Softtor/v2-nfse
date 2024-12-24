import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaClient } from '@prisma/client';

describe('FiscalRpsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.fiscalService.deleteMany();
    await prisma.fiscalEmitter.deleteMany();
    await prisma.fiscalTaker.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.fiscalService.deleteMany();
    await prisma.fiscalEmitter.deleteMany();
    await prisma.fiscalTaker.deleteMany();
  });

  describe('/POST fiscal-rps/taker', () => {
    it('should create a new fiscal taker', async () => {
      const createTakerDto = {
        document: '123456789',
        name: 'Test Taker',
        address: 'Main Street',
        number: '100',
        complement: 'Suite A',
        neighborhood: 'Downtown',
        cityCode: 12345,
        state: 'CA',
        zipCode: '12345-678',
        isForeign: false,
        countryCode: 'US',
        phone: '1234567890',
        email: 'test.taker@example.com',
      };

      const response = await request(app.getHttpServer())
        .post('/fiscal-rps/taker')
        .send(createTakerDto)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        ...createTakerDto,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should throw an error for missing required fields', async () => {
      const invalidTakerDto = {
        name: 'Test Taker',
      };

      const response = await request(app.getHttpServer())
        .post('/fiscal-rps/taker')
        .send(invalidTakerDto)
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        message: expect.any(String),
      });
    });
  });

  describe('/POST fiscal-rps/service', () => {
    it('should create a new fiscal service', async () => {
      // Cria um emitter para ser usado no teste
      const emitter = await prisma.fiscalEmitter.create({
        data: {
          name: 'Test Emitter',
          document: '12345678000199',
          email: 'emitter@example.com',
          address: 'Emitter Street',
          number: '10',
          state: 'CA',
          municipality_code: '12345',
          postal_code: '12345-678',
          crt: 'Simples Nacional',
          im: '123456',
          cnae_code: '6203100',
          aliquot: 5.5,
          iss: 2.0,
          iss_retido: 'Não',
          service_item_list: 'Consulting',
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      const createServiceDto = {
        externalPlanCode: 'PLAN001',
        serviceValue: 1000.0,
        serviceDescription: 'IT Consulting Services',
        emitterId: emitter.id, // Usa o ID do emitter criado
      };

      const response = await request(app.getHttpServer())
        .post('/fiscal-rps/service')
        .send(createServiceDto)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        serviceValue: createServiceDto.serviceValue,
        serviceDescription: createServiceDto.serviceDescription,
        externalPlanCode: createServiceDto.externalPlanCode,
        cnaeCode: emitter.cnae_code,
        municipalTaxationCode: emitter.crt,
        municipalityCode: emitter.municipality_code.toString(),
        rate: emitter.aliquot,
        issValue: emitter.iss,
        incidenceMunicipality: emitter.municipality_code.toString(),
        issExigibility: 1,
        unconditionalDiscount: 0,
        conditionalDiscount: 0,
        deductionValue: 0,
        pisValue: 0,
        serviceItemList: emitter.service_item_list,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should throw an error if the emitter does not exist', async () => {
      const invalidServiceDto = {
        externalPlanCode: 'PLAN002',
        serviceValue: 500.0,
        serviceDescription: 'Development Services',
        emitterId: 'non-existent-id',
      };

      const response = await request(app.getHttpServer())
        .post('/fiscal-rps/service')
        .send(invalidServiceDto)
        .expect(404);

      expect(response.body).toMatchObject({
        statusCode: 404,
        message: expect.any(String),
      });
    });
  });
});
