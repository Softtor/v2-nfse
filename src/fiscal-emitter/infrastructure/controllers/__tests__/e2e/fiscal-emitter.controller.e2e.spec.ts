import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaClient } from '@prisma/client';

describe('FiscalEmitterController (e2e)', () => {
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
    await prisma.fiscalEmitter.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.fiscalEmitter.deleteMany();
  });

  describe('/POST fiscal-emitters', () => {
    it('should create a new fiscal emitter with all fields', async () => {
      const createDto = {
        name: 'Test Company',
        document: '123456789',
        address: 'Main St',
        number: '10',
        email: 'test@company.com',
        nickname: 'TestNick',
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
      };

      const response = await request(app.getHttpServer())
        .post('/fiscal-emitters')
        .send(createDto)
        .expect(201);

      console.log('Created Fiscal Emitter:', response.body);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        ...createDto,
      });
    });
  });

  describe('/GET fiscal-emitters/:id', () => {
    it('should retrieve a fiscal emitter by ID with all fields', async () => {
      const created = await prisma.fiscalEmitter.create({
        data: {
          name: 'Test Company',
          document: '987654321',
          address: 'Another St',
          number: '20',
          email: 'another@company.com',
          nickname: 'AnotherNick',
          complement: 'Suite 201',
          neighborhood: 'Suburb',
          state: 'NY',
          city_code: 67890,
          zip_code: '54321-876',
          crt: 'CRT002',
          ie: 'IE002',
          im: 'IM002',
          cnae_code: '6202-5/00',
          activity_code: '54321',
          aliquot: 10.0,
          iss: 3.0,
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/fiscal-emitters/${created.id}`)
        .expect(200);

      console.log('Retrieved Fiscal Emitter:', response.body);

      expect(response.body).toMatchObject({
        id: created.id,
        name: 'Test Company',
        document: '987654321',
        address: 'Another St',
        number: '20',
        email: 'another@company.com',
        nickname: 'AnotherNick',
        complement: 'Suite 201',
        neighborhood: 'Suburb',
        state: 'NY',
        cityCode: 67890,
        zipCode: '54321-876',
        crt: 'CRT002',
        ie: 'IE002',
        im: 'IM002',
        cnaeCode: '6202-5/00',
        activityCode: '54321',
        aliquot: 10.0,
        iss: 3.0,
      });
    });
  });

  describe('/PUT fiscal-emitters/:id', () => {
    it('should update a fiscal emitter with all fields', async () => {
      const created = await prisma.fiscalEmitter.create({
        data: {
          name: 'Old Company',
          document: '123123123',
          address: 'Old St',
          number: '15',
          email: 'old@company.com',
          nickname: 'OldNick',
          complement: 'Suite 101',
          neighborhood: 'OldTown',
          state: 'TX',
          city_code: 11111,
          zip_code: '12345-678',
          crt: 'CRT003',
          ie: 'IE003',
          im: 'IM003',
          cnae_code: '6301-5/00',
          activity_code: '11111',
          aliquot: 7.5,
          iss: 2.5,
        },
      });

      const updateDto = {
        name: 'Updated Company',
        number: '50',
        email: 'updated@company.com',
        crt: 'CRT004',
      };

      const response = await request(app.getHttpServer())
        .put(`/fiscal-emitters/${created.id}`)
        .send(updateDto)
        .expect(200);

      console.log('Updated Fiscal Emitter:', response.body);

      expect(response.body).toMatchObject({
        id: created.id,
        name: 'Updated Company',
        document: '123123123',
        address: 'Old St',
        number: '50',
        email: 'updated@company.com',
        nickname: 'OldNick',
        complement: 'Suite 101',
        neighborhood: 'OldTown',
        state: 'TX',
        cityCode: 11111,
        zipCode: '12345-678',
        crt: 'CRT004',
        ie: 'IE003',
        im: 'IM003',
        cnaeCode: '6301-5/00',
        activityCode: '11111',
        aliquot: 7.5,
        iss: 2.5,
      });
    });
  });

  describe('/GET fiscal-emitters', () => {
    it('should list fiscal emitters with all fields', async () => {
      await prisma.fiscalEmitter.createMany({
        data: [
          {
            name: 'List Company 1',
            document: '111111111',
            address: 'St 1',
            number: '1',
            email: 'list1@company.com',
            nickname: 'ListNick1',
            complement: 'Apt 1',
            neighborhood: 'Neighborhood 1',
            state: 'CA',
            city_code: 12345,
            zip_code: '11111-111',
            crt: 'CRT101',
            ie: 'IE101',
            im: 'IM101',
            cnae_code: '6010-1/00',
            activity_code: '10101',
            aliquot: 8.0,
            iss: 1.5,
          },
          {
            name: 'List Company 2',
            document: '222222222',
            address: 'St 2',
            number: '2',
            email: 'list2@company.com',
            nickname: 'ListNick2',
            complement: 'Apt 2',
            neighborhood: 'Neighborhood 2',
            state: 'NY',
            city_code: 54321,
            zip_code: '22222-222',
            crt: 'CRT102',
            ie: 'IE102',
            im: 'IM102',
            cnae_code: '6020-2/00',
            activity_code: '20202',
            aliquot: 9.0,
            iss: 2.5,
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/fiscal-emitters')
        .query({ page: 1, perPage: 10 })
        .expect(200);

      console.log('Listed Fiscal Emitters:', response.body);

      expect(response.body.items).toHaveLength(2);
      expect(response.body.meta).toMatchObject({
        total: 2,
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
      });
    });
  });
});
