import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaClient, taxation_regime } from '@prisma/client';

describe('FiscalNfConfigController (e2e)', () => {
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
    await prisma.fiscalNfConfig.deleteMany();
    await prisma.fiscalEmitter.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.fiscalNfConfig.deleteMany();
    await prisma.fiscalEmitter.deleteMany();
  });

  describe('/POST fiscal-nf-configs', () => {
    it('should create a new fiscal NF config', async () => {
      const mockEmitter = await prisma.fiscalEmitter.create({
        data: {
          name: 'Test Company',
          document: '123456789',
          address: 'Main St',
          number: '10',
          email: 'test@company.com',
          nickname: 'TestNick',
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
        },
      });

      const createDto = {
        serie: '12345',
        nextDocumentNumber: 1000,
        simpleNational: true,
        taxationRegime: '1', // API expects string
        emitterId: mockEmitter.id,
      };

      const response = await request(app.getHttpServer())
        .post('/fiscal-nf-configs')
        .send(createDto)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        ...createDto,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe('/GET fiscal-nf-configs/:emitterId', () => {
    it('should retrieve a fiscal NF config by emitter ID', async () => {
      const mockEmitter = await prisma.fiscalEmitter.create({
        data: {
          name: 'Test Company',
          document: '123456789',
          address: 'Main St',
          number: '10',
          email: 'test@company.com',
          nickname: 'TestNick',
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
        },
      });

      const createdConfig = await prisma.fiscalNfConfig.create({
        data: {
          serie: '12345',
          next_document_number: 100,
          simple_national: true,
          taxation_regime: taxation_regime.MICROEMPRESA_MUNICIPAL,
          emitter_id: mockEmitter.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/fiscal-nf-configs/${mockEmitter.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdConfig.id,
        serie: '12345',
        nextDocumentNumber: 100,
        simpleNational: true,
        taxationRegime: '1', // Response as expected by API
        emitterId: mockEmitter.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe('/PUT fiscal-nf-configs/:id', () => {
    it('should update an existing fiscal NF config', async () => {
      const mockEmitter = await prisma.fiscalEmitter.create({
        data: {
          name: 'Test Company',
          document: '123456789',
          address: 'Main St',
          number: '10',
          email: 'test@company.com',
          nickname: 'TestNick',
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
        },
      });

      const createdConfig = await prisma.fiscalNfConfig.create({
        data: {
          serie: '12345',
          next_document_number: 100,
          simple_national: true,
          taxation_regime: taxation_regime.MICROEMPRESA_MUNICIPAL,
          emitter_id: mockEmitter.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      const updateDto = {
        serie: '54321',
        nextDocumentNumber: 200,
      };

      const response = await request(app.getHttpServer())
        .put(`/fiscal-nf-configs/${createdConfig.id}`)
        .send(updateDto)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdConfig.id,
        serie: '54321',
        nextDocumentNumber: 200,
        simpleNational: true,
        taxationRegime: '1', // Response as expected by API
        emitterId: mockEmitter.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
