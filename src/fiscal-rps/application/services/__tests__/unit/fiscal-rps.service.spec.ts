import { Test, TestingModule } from '@nestjs/testing';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import { FiscalRpsService } from '../../fiscal-rps.service';
import {
  CreateFiscalRpsDTO,
  UpdateFiscalRpsDTO,
} from '@/fiscal-rps/application/dtos/fiscal-data-input.dto';
import { FiscalRpsOutputMapper } from '@/fiscal-rps/application/dtos/fiscal-rps-output.dto';

describe('FiscalRpsService', () => {
  let service: FiscalRpsService;
  let repository: jest.Mocked<FiscalRpsRepository>;

  const mockRepository = () => ({
    save: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FiscalRpsService,
        { provide: 'FiscalRpsPrismaRepository', useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<FiscalRpsService>(FiscalRpsService);
    repository = module.get('FiscalRpsPrismaRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a FiscalRpsEntity', async () => {
      jest.spyOn(FiscalRpsEntity, 'validate').mockImplementation(() => true);
      const dto: CreateFiscalRpsDTO = {
        rps: {
          number: 123,
          series: 'A1',
          type: 'RPS',
          status: 'NORMAL',
          serviceId: 'service-id',
          takerId: 'taker-id',
          providerId: 'provider-id',
          batchId: null,
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
      };

      const entity = new FiscalRpsEntity({
        ...dto.rps,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      repository.save.mockResolvedValue(undefined);

      const output = FiscalRpsOutputMapper.toOutput(entity);
      jest.spyOn(FiscalRpsOutputMapper, 'toOutput').mockReturnValue(output);

      const result = await service.create(dto);

      expect(repository.save).toHaveBeenCalledWith(expect.any(FiscalRpsEntity));
      expect(result).toEqual(output);
    });
  });
  describe('update', () => {
    it('should update an existing FiscalRpsEntity', async () => {
      const existingEntity = new FiscalRpsEntity({
        number: 123,
        series: 'A1',
        type: 'RPS',
        status: 'NORMAL',
        serviceId: 'service-id',
        takerId: 'taker-id',
        providerId: 'provider-id',
        batchId: null,
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-01T00:00:00Z'),
      });

      const dto: UpdateFiscalRpsDTO = {
        id: existingEntity.id,
        batchId: 'batch-id',
        issueDateRps: new Date('2024-01-02T00:00:00Z'),
      };

      repository.findById.mockResolvedValue(existingEntity);
      repository.update.mockResolvedValue(undefined);

      const updatedEntity = new FiscalRpsEntity({
        ...existingEntity.props,
        batchId: dto.batchId,
        issueDateRps: dto.issueDateRps,
        updatedAt: expect.any(Date),
      });

      jest.spyOn(FiscalRpsEntity, 'validate').mockImplementation(() => true);
      const output = FiscalRpsOutputMapper.toOutput(updatedEntity);
      jest.spyOn(FiscalRpsOutputMapper, 'toOutput').mockReturnValue(output);

      const result = await service.update(dto);

      expect(repository.findById).toHaveBeenCalledWith(dto.id);
      expect(repository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          id: existingEntity.id,
          batchId: dto.batchId,
          issueDateRps: dto.issueDateRps,
        }),
      );
      expect(result).toEqual(output);
    });
  });

  describe('findAllByCreatedAt', () => {
    it('should return all RPS created at a specific date', async () => {
      const createdAt = new Date('2024-01-01T00:00:00Z');
      const entities = [
        new FiscalRpsEntity({
          number: 123,
          series: 'A1',
          type: 'RPS',
          status: 'NORMAL',
          serviceId: 'service-id',
          takerId: 'taker-id',
          providerId: 'provider-id',
          batchId: null,
          createdAt,
          updatedAt: new Date(),
        }),
      ];

      repository.findAll.mockResolvedValue(entities);

      const outputs = entities.map(FiscalRpsOutputMapper.toOutput);

      const result = await service.findAllByCreatedAt(createdAt);

      expect(repository.findAll).toHaveBeenCalledWith(createdAt);
      expect(result).toEqual(outputs);
    });
  });
});
