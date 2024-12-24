import { Test, TestingModule } from '@nestjs/testing';
import { CreateFiscalNfConfigUseCase } from '@/fiscal-nf-config/application/usecases/create-fiscal-nf-config.usecase';
import { UpdateFiscalNfConfigUseCase } from '@/fiscal-nf-config/application/usecases/update-fiscal-nf-config.usecase';
import { GetFiscalNfConfigsByEmitterUseCase } from '@/fiscal-nf-config/application/usecases/get-fiscal-nf-config-byEmitter.usecase';
import { FiscalNfConfigController } from '../../fiscal-nf-config.controller';
import { CreateFiscalNfConfigDto } from '@/fiscal-nf-config/infrastructure/dto/create-fiscal-nf-config.dto';
import { UpdateFiscalNfConfigDto } from '@/fiscal-nf-config/infrastructure/dto/update-fiscal-nf-config.dto';

describe('FiscalNfConfigController', () => {
  let controller: FiscalNfConfigController;
  let getFiscalNfConfigsByEmitterUseCase: jest.Mocked<GetFiscalNfConfigsByEmitterUseCase>;
  let createFiscalNfConfigUseCase: jest.Mocked<CreateFiscalNfConfigUseCase>;
  let updateFiscalNfConfigUseCase: jest.Mocked<UpdateFiscalNfConfigUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiscalNfConfigController],
      providers: [
        {
          provide: GetFiscalNfConfigsByEmitterUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreateFiscalNfConfigUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateFiscalNfConfigUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<FiscalNfConfigController>(FiscalNfConfigController);
    getFiscalNfConfigsByEmitterUseCase = module.get(
      GetFiscalNfConfigsByEmitterUseCase,
    );
    createFiscalNfConfigUseCase = module.get(CreateFiscalNfConfigUseCase);
    updateFiscalNfConfigUseCase = module.get(UpdateFiscalNfConfigUseCase);
  });

  it('should find fiscal configuration by emitter ID', async () => {
    const mockOutput = {
      id: '1',
      serie: '12345',
      nextDocumentNumber: 100,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    getFiscalNfConfigsByEmitterUseCase.execute.mockResolvedValue(mockOutput);

    const result = await controller.findByEmitterId({
      emitterId: 'emitter-id',
    });

    expect(getFiscalNfConfigsByEmitterUseCase.execute).toHaveBeenCalledWith(
      'emitter-id',
    );
    expect(result).toEqual(controller['toResponse'](mockOutput));
  });

  it('should create a new fiscal configuration', async () => {
    const createDto: CreateFiscalNfConfigDto = {
      serie: '12345',
      nextDocumentNumber: 100,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'emitter-id',
    };

    const mockOutput = {
      id: '1',
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createFiscalNfConfigUseCase.execute.mockResolvedValue(mockOutput);

    const result = await controller.create(createDto);

    expect(createFiscalNfConfigUseCase.execute).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(controller['toResponse'](mockOutput));
  });

  it('should update an existing fiscal configuration', async () => {
    const updateDto: UpdateFiscalNfConfigDto = {
      serie: '54321',
      nextDocumentNumber: 200,
    };

    const mockOutput = {
      id: '1',
      serie: '54321',
      nextDocumentNumber: 200,
      simpleNational: true,
      taxationRegime: '1',
      emitterId: 'emitter-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    updateFiscalNfConfigUseCase.execute.mockResolvedValue(mockOutput);

    const result = await controller.update('1', updateDto);

    expect(updateFiscalNfConfigUseCase.execute).toHaveBeenCalledWith({
      id: '1',
      ...updateDto,
    });
    expect(result).toEqual(controller['toResponse'](mockOutput));
  });
});
