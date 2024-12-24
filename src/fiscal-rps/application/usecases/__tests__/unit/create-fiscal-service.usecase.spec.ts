import { Test, TestingModule } from '@nestjs/testing';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { CreateFiscalServiceUseCase } from '../../create-fiscal-service.usecase';

describe('CreateFiscalServiceUseCase', () => {
  let useCase: CreateFiscalServiceUseCase;
  let repository: jest.Mocked<FiscalServiceRepository>;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  const input = {
    serviceValue: 1000,
    serviceDescription: 'Test Service',
    externalPlanCode: 'EXTERNAL123',
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

  const validServiceProps = {
    ...input,
    cnaeCode: emitterMock[0].cnaeCode,
    municipalityCode: emitterMock[0].address.municipalityCode,
    rate: emitterMock[0].aliquot,
    issValue: emitterMock[0].iss,
    incidenceMunicipality: emitterMock[0].address.municipalityCode,
    municipalTaxationCode: emitterMock[0].municipalTaxationCode,
    issExigibility: 0,
    pisValue: emitterMock[0].pis,
    serviceItemList: emitterMock[0].serviceItemList,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFiscalServiceUseCase,
        {
          provide: 'FiscalServicePrismaRepository',
          useValue: {
            externalPlanCodeExists: jest.fn(),
            findByExternalPlanCode: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: { emitAsync: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<CreateFiscalServiceUseCase>(
      CreateFiscalServiceUseCase,
    );
    repository = module.get('FiscalServicePrismaRepository');
    eventEmitter = module.get(EventEmitter2);
  });

  it('should return existing service if externalPlanCode exists', async () => {
    const existingService = new FiscalServiceEntity(validServiceProps);
    repository.externalPlanCodeExists.mockResolvedValue(true);
    repository.findByExternalPlanCode.mockResolvedValue(existingService);

    const result = await useCase.execute(input);

    expect(repository.findByExternalPlanCode).toHaveBeenCalledWith(
      input.externalPlanCode,
    );
    expect(result).toEqual(existingService);
  });

  it('should create and return a new service entity', async () => {
    repository.externalPlanCodeExists.mockResolvedValue(false);
    eventEmitter.emitAsync.mockResolvedValue(emitterMock);

    const result = await useCase.execute(input);

    expect(repository.save).toHaveBeenCalledWith(
      expect.any(FiscalServiceEntity),
    );
    expect(result.serviceValue).toEqual(input.serviceValue);
    expect(result.serviceDescription).toEqual(input.serviceDescription);
  });

  it('should throw NotFoundError if emitter does not exist', async () => {
    repository.externalPlanCodeExists.mockResolvedValue(false);
    eventEmitter.emitAsync.mockResolvedValue([]);

    await expect(useCase.execute(input)).rejects.toThrow(
      new NotFoundError(`Fiscal Emitter with ID ${input.emitterId} not found.`),
    );
  });
});
