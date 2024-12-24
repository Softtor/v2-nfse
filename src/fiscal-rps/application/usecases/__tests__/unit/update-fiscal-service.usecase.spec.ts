import { Test, TestingModule } from '@nestjs/testing';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { UpdateFiscalServiceUseCase } from '../../update-fiscal-service.usecase';

describe('UpdateFiscalServiceUseCase', () => {
  let useCase: UpdateFiscalServiceUseCase;
  let repository: jest.Mocked<FiscalServiceRepository>;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  const input = {
    id: 'SERVICE123',
    serviceValue: 2000,
    serviceDescription: 'Updated Service',
    emitterId: 'EMITTER123',
  };

  const emitterMock = [
    {
      cnaeCode: '1234',
      aliquot: 5,
      iss: 2,
      address: { municipalityCode: '5678' },
      municipalTaxationCode: 'TAX123',
      pis: 1,
      serviceItemList: 'ITEM123',
    },
  ];

  const existingServiceProps = {
    serviceValue: 1000,
    serviceDescription: 'Original Service',
    externalPlanCode: 'PLAN123',
    cnaeCode: '1234',
    municipalityCode: '5678',
    rate: 5,
    issValue: 2,
    incidenceMunicipality: '5678',
    municipalTaxationCode: 'TAX123',
    issExigibility: 0,
    pisValue: 1,
    serviceItemList: 'ITEM123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let existingService: FiscalServiceEntity;

  beforeEach(async () => {
    existingService = new FiscalServiceEntity(existingServiceProps);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateFiscalServiceUseCase,
        {
          provide: 'FiscalServicePrismaRepository',
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: { emitAsync: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<UpdateFiscalServiceUseCase>(
      UpdateFiscalServiceUseCase,
    );
    repository = module.get('FiscalServicePrismaRepository');
    eventEmitter = module.get(EventEmitter2);
  });

  it('should update an existing service', async () => {
    repository.findById.mockResolvedValue(existingService);
    eventEmitter.emitAsync.mockResolvedValue(emitterMock);

    const result = await useCase.execute(input);

    expect(repository.findById).toHaveBeenCalledWith(input.id);
    expect(repository.update).toHaveBeenCalledWith(existingService);
    expect(result.serviceValue).toEqual(input.serviceValue);
    expect(result.serviceDescription).toEqual(input.serviceDescription);
  });

  it('should throw NotFoundError if service does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(`Service with ID ${input.id} not found.`),
    );
  });

  it('should update fields without emitterId', async () => {
    repository.findById.mockResolvedValue(existingService);

    const partialInput = { id: input.id, serviceValue: 1500 };
    const result = await useCase.execute(partialInput);

    expect(repository.update).toHaveBeenCalledWith(existingService);
    expect(result.serviceValue).toEqual(1500);
    expect(result.serviceDescription).toEqual('Original Service');
  });
});
