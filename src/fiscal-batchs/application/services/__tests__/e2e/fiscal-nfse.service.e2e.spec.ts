import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FiscalNfseService } from '@/fiscal-batchs/application/services/fiscal-nfse/fiscal-nfse.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-nfse.entity';

describe('FiscalNfseService (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let nfseService: FiscalNfseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        FiscalNfseService,
        {
          provide: 'FiscalNfsePrismaRepository',
          useValue: {
            save: jest.fn(),
            findByRpsId: jest.fn(),
            findByTakerId: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    nfseService = app.get<FiscalNfseService>(FiscalNfseService);

    await app.init();

    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an NFS-e', async () => {
    const mockDto = {
      url: 'http://example.com/nfse',
      validationUrl: 'http://example.com/validate',
      webserviceNumber: 123,
      generatingOrgan: 'Test Organ',
      rpsId: 'mock-rps-id',
      takerId: 'some-taker',
      sentAt: new Date(),
    };

    const mockRepository = app.get('FiscalNfsePrismaRepository');
    const saveSpy = jest
      .spyOn(mockRepository, 'save')
      .mockResolvedValueOnce(undefined);

    const nfse = await nfseService.create(mockDto);

    // Validations
    expect(nfse).toBeDefined();
    expect(nfse.url).toBe(mockDto.url);
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(expect.any(FiscalNfseEntity));
  });

  it('deve buscar uma NFS-e por RPS', async () => {
    const mockRpsId = 'mock-rps-id';
    const mockNfse = new FiscalNfseEntity({
      url: 'http://example.com/nfse',
      validationUrl: 'http://example.com/validate',
      webserviceNumber: 123,
      generatingOrgan: 'Test Organ',
      rpsId: mockRpsId,
      takerId: 'some-taker',
      sentAt: new Date(),
      createdAt: new Date(),
    });

    const mockRepository = app.get('FiscalNfsePrismaRepository');
    const findByRpsIdSpy = jest
      .spyOn(mockRepository, 'findByRpsId')
      .mockResolvedValueOnce(mockNfse);

    const nfse = await nfseService.getByRps(mockRpsId);

    expect(nfse).toBeDefined();
    expect(nfse.rpsId).toBe(mockRpsId);
    expect(findByRpsIdSpy).toHaveBeenCalledTimes(1);
    expect(findByRpsIdSpy).toHaveBeenCalledWith(mockRpsId);
  });

  it('should throw NotFoundError when fetching NFS-e with non-existent RPS', async () => {
    const mockRpsId = 'non-existent-rps-id';

    const mockRepository = app.get('FiscalNfsePrismaRepository');
    jest.spyOn(mockRepository, 'findByRpsId').mockResolvedValueOnce(null);

    await expect(nfseService.getByRps(mockRpsId)).rejects.toThrow(
      new NotFoundError(`NFS-e not found for RPS ID: ${mockRpsId}`),
    );
  });

  it('should fetch NFS-es by taker', async () => {
    const mockTakerId = 'mock-taker-id';
    const mockNfses = [
      new FiscalNfseEntity({
        url: 'http://example.com/nfse1',
        validationUrl: 'http://example.com/validate1',
        webserviceNumber: 123,
        generatingOrgan: 'Test Organ 1',
        rpsId: 'mock-rps-id-1',
        takerId: 'some-taker-id',
        sentAt: new Date(),
        createdAt: new Date(),
      }),
      new FiscalNfseEntity({
        url: 'http://example.com/nfse2',
        validationUrl: 'http://example.com/validate2',
        webserviceNumber: 124,
        generatingOrgan: 'Test Organ 2',
        rpsId: 'mock-rps-id-2',
        takerId: 'some-taker-id',
        sentAt: new Date(),
        createdAt: new Date(),
      }),
    ];

    const mockRepository = app.get('FiscalNfsePrismaRepository');
    const findByTakerIdSpy = jest
      .spyOn(mockRepository, 'findByTakerId')
      .mockResolvedValueOnce(mockNfses);

    const nfses = await nfseService.getByTaker(mockTakerId);

    // Validations
    expect(nfses).toBeDefined();
    expect(nfses).toHaveLength(2);
    expect(nfses[0].url).toBe('http://example.com/nfse1');
    expect(nfses[1].url).toBe('http://example.com/nfse2');
    expect(findByTakerIdSpy).toHaveBeenCalledTimes(1);
    expect(findByTakerIdSpy).toHaveBeenCalledWith(mockTakerId);
  });
});
