import { Test, TestingModule } from '@nestjs/testing';
import { FiscalTakerRepository } from '@/fiscal-rps/domain/repositories/fiscal-taker.repository';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { CreateOrGetServiceAndTakerService } from '../../fiscal-service-and-taker.service';
import { CreateFiscalRpsDTO } from '@/fiscal-rps/application/dtos/fiscal-data-input.dto';
import { FiscalTakerAndServiceOutputMapper } from '@/fiscal-rps/application/dtos/fiscal-taker-and-service-output-dto';

describe('CreateOrGetServiceAndTakerService', () => {
  let service: CreateOrGetServiceAndTakerService;
  let takerRepository: jest.Mocked<FiscalTakerRepository>;
  let serviceRepository: jest.Mocked<FiscalServiceRepository>;

  const mockTakerRepository = () => ({
    documentExists: jest.fn(),
    findByDocument: jest.fn(),
    save: jest.fn(),
  });

  const mockServiceRepository = () => ({
    externalPlanCodeExists: jest.fn(),
    findByExternalPlanCode: jest.fn(),
    save: jest.fn(),
  });

  const createFiscalRpsDTO: CreateFiscalRpsDTO = {
    taker: {
      id: 'taker-id',
      document: '12345678900',
      name: 'John Doe',
      address: '123 Main St',
      number: '45A',
      neighborhood: 'Downtown',
      cityCode: 12345,
      state: 'PR',
      zipCode: '12345-678',
      isForeign: false,
      phone: '1234567890',
      email: 'john.doe@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    service: {
      id: 'service-id',
      serviceValue: 100.0,
      deductionValue: 0.0,
      pisValue: 10.0,
      unconditionalDiscount: 0.0,
      conditionalDiscount: 0.0,
      issWithheld: 1,
      serviceItemList: '01',
      cnaeCode: '123456',
      municipalTaxationCode: 'ABC',
      serviceDescription: 'Sample Service',
      municipalityCode: '98765',
      issExigibility: 1,
      incidenceMunicipality: '98765',
      externalPlanCode: 'EXT001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    rps: {
      number: 123,
      series: 'A1',
      type: 'RPS',
      status: 'NORMAL',
      serviceId: 'service-id',
      takerId: 'taker-id',
      providerId: 'provider-id',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrGetServiceAndTakerService,
        {
          provide: 'FiscalTakerPrismaRepository',
          useFactory: mockTakerRepository,
        },
        {
          provide: 'FiscalServicePrismaRepository',
          useFactory: mockServiceRepository,
        },
      ],
    }).compile();

    service = module.get<CreateOrGetServiceAndTakerService>(
      CreateOrGetServiceAndTakerService,
    );
    takerRepository = module.get('FiscalTakerPrismaRepository');
    serviceRepository = module.get('FiscalServicePrismaRepository');
  });

  it('should create a new taker and service if they do not exist', async () => {
    takerRepository.documentExists.mockResolvedValue(false);
    serviceRepository.externalPlanCodeExists.mockResolvedValue(false);

    const takerEntity = new FiscalTakerEntity(createFiscalRpsDTO.taker);
    const serviceEntity = new FiscalServiceEntity(createFiscalRpsDTO.service);

    takerRepository.save.mockResolvedValue();
    serviceRepository.save.mockResolvedValue();

    const outputMock = {
      taker: createFiscalRpsDTO.taker,
      service: createFiscalRpsDTO.service,
    };

    jest
      .spyOn(FiscalTakerAndServiceOutputMapper, 'toOutput')
      .mockReturnValue(outputMock);

    const result = await service.execute(createFiscalRpsDTO);

    expect(takerRepository.documentExists).toHaveBeenCalledWith(
      createFiscalRpsDTO.taker.document,
    );
    expect(takerRepository.save).toHaveBeenCalledWith(
      expect.any(FiscalTakerEntity),
    );
    expect(serviceRepository.externalPlanCodeExists).toHaveBeenCalledWith(
      createFiscalRpsDTO.service.externalPlanCode,
    );
    expect(serviceRepository.save).toHaveBeenCalledWith(
      expect.any(FiscalServiceEntity),
    );
    expect(result).toEqual(outputMock);
  });

  it('should return existing taker and service if they already exist', async () => {
    const existingTakerEntity = new FiscalTakerEntity(createFiscalRpsDTO.taker);
    const existingServiceEntity = new FiscalServiceEntity(
      createFiscalRpsDTO.service,
    );

    takerRepository.documentExists.mockResolvedValue(true);
    serviceRepository.externalPlanCodeExists.mockResolvedValue(true);

    takerRepository.findByDocument.mockResolvedValue(existingTakerEntity);
    serviceRepository.findByExternalPlanCode.mockResolvedValue(
      existingServiceEntity,
    );

    const outputMock = {
      taker: createFiscalRpsDTO.taker,
      service: createFiscalRpsDTO.service,
    };

    jest
      .spyOn(FiscalTakerAndServiceOutputMapper, 'toOutput')
      .mockReturnValue(outputMock);

    const result = await service.execute(createFiscalRpsDTO);

    expect(takerRepository.documentExists).toHaveBeenCalledWith(
      createFiscalRpsDTO.taker.document,
    );
    expect(serviceRepository.externalPlanCodeExists).toHaveBeenCalledWith(
      createFiscalRpsDTO.service.externalPlanCode,
    );
    expect(result).toEqual(outputMock);
  });
});
