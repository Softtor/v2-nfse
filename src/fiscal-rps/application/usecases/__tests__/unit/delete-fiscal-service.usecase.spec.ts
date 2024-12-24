import { Test, TestingModule } from '@nestjs/testing';
import { DeleteFiscalServiceUseCase } from '../../delete-fiscal-service.usecase';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';

describe('DeleteFiscalServiceUseCase', () => {
  let useCase: DeleteFiscalServiceUseCase;
  let repository: jest.Mocked<FiscalServiceRepository>;

  const serviceId = 'SERVICE123';

  // Criação de um objeto válido para FiscalServiceEntity
  const validServiceEntity = new FiscalServiceEntity({
    serviceValue: 1000,
    deductionValue: 0,
    pisValue: 0,
    cofinsValue: 0,
    inssValue: 0,
    irValue: 0,
    csllValue: 0,
    otherRetentions: 0,
    totalTributesValue: 0,
    issValue: 0,
    rate: 0,
    nbsCode: 'NBS123',
    unconditionalDiscount: 0,
    conditionalDiscount: 0,
    issWithheld: 0,
    serviceItemList: 'ITEM123',
    cnaeCode: '1234',
    municipalTaxationCode: 'TAX123',
    serviceDescription: 'Test Service',
    municipalityCode: '5678',
    issExigibility: 0,
    incidenceMunicipality: '5678',
    externalPlanCode: 'EXT123',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteFiscalServiceUseCase,
        {
          provide: 'FiscalServicePrismaRepository',
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<DeleteFiscalServiceUseCase>(
      DeleteFiscalServiceUseCase,
    );
    repository = module.get('FiscalServicePrismaRepository');
  });

  it('should delete an existing service', async () => {
    repository.findById.mockResolvedValue(validServiceEntity);
    repository.delete.mockResolvedValue(undefined);

    await useCase.execute(serviceId);

    expect(repository.findById).toHaveBeenCalledWith(serviceId);
    expect(repository.delete).toHaveBeenCalledWith(serviceId);
  });

  it('should throw NotFoundError if service does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute(serviceId)).rejects.toThrow(
      new NotFoundError(`Service with ID ${serviceId} not found.`),
    );

    expect(repository.findById).toHaveBeenCalledWith(serviceId);
    expect(repository.delete).not.toHaveBeenCalled();
  });
});
