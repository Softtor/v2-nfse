import { Test, TestingModule } from '@nestjs/testing';
import { CreateFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/create-fiscal-emitter.usecase';
import { GetFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/get-fiscal-emitter.usecase';
import { UpdateFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/update-fiscal-emitter.usecase';
import { ListFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/list-fiscal-emitter.usecase';
import { FiscalEmitterController } from '../../fiscal-emitter.controller';

describe('FiscalEmitterController', () => {
  let controller: FiscalEmitterController;
  let createUseCase: jest.Mocked<CreateFiscalEmitterUseCase>;
  let getUseCase: jest.Mocked<GetFiscalEmitterUseCase>;
  let updateUseCase: jest.Mocked<UpdateFiscalEmitterUseCase>;
  let listUseCase: jest.Mocked<ListFiscalEmitterUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiscalEmitterController],
      providers: [
        {
          provide: CreateFiscalEmitterUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetFiscalEmitterUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateFiscalEmitterUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListFiscalEmitterUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<FiscalEmitterController>(FiscalEmitterController);
    createUseCase = module.get<CreateFiscalEmitterUseCase>(
      CreateFiscalEmitterUseCase,
    ) as jest.Mocked<CreateFiscalEmitterUseCase>;
    getUseCase = module.get<GetFiscalEmitterUseCase>(
      GetFiscalEmitterUseCase,
    ) as jest.Mocked<GetFiscalEmitterUseCase>;
    updateUseCase = module.get<UpdateFiscalEmitterUseCase>(
      UpdateFiscalEmitterUseCase,
    ) as jest.Mocked<UpdateFiscalEmitterUseCase>;
    listUseCase = module.get<ListFiscalEmitterUseCase>(
      ListFiscalEmitterUseCase,
    ) as jest.Mocked<ListFiscalEmitterUseCase>;
  });

  it('should create a fiscal emitter', async () => {
    const createDto = {
      name: 'Test Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
    };

    const expectedOutput = { id: '1', ...createDto };

    createUseCase.execute.mockResolvedValue(expectedOutput);

    const result = await controller.create(createDto);

    expect(createUseCase.execute).toHaveBeenCalledWith(createDto);
    expect(result).toEqual({
      id: '1',
      name: 'Test Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
      email: undefined,
      nickname: undefined,
      complement: undefined,
      neighborhood: undefined,
      state: undefined,
      cityCode: undefined,
      zipCode: undefined,
      crt: undefined,
      ie: undefined,
      im: undefined,
      cnaeCode: undefined,
      activityCode: undefined,
      aliquot: undefined,
      iss: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
  });

  it('should retrieve a fiscal emitter by ID', async () => {
    const id = '1';
    const expectedOutput = {
      id,
      name: 'Test Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
    };

    getUseCase.execute.mockResolvedValue(expectedOutput);

    const result = await controller.findOne(id);

    expect(getUseCase.execute).toHaveBeenCalledWith({ id });
    expect(result).toEqual(expectedOutput);
  });

  it('should update a fiscal emitter', async () => {
    const id = '1';
    const updateDto = { name: 'Updated Company' };
    const expectedOutput = {
      id,
      name: 'Updated Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
    };

    updateUseCase.execute.mockResolvedValue(expectedOutput);

    const result = await controller.update(id, updateDto);

    expect(updateUseCase.execute).toHaveBeenCalledWith({ id, ...updateDto });
    expect(result).toEqual(expectedOutput);
  });

  it('should list fiscal emitters', async () => {
    const query = { page: 1, perPage: 10 };

    const useCaseOutput = {
      items: [
        {
          id: '1',
          name: 'Test Company',
          document: '123456789',
          address: 'Main St',
          number: '10',
        },
      ],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
    };

    listUseCase.execute.mockResolvedValue(useCaseOutput);

    const expectedOutput = {
      items: useCaseOutput.items,
      meta: {
        total: useCaseOutput.total,
        currentPage: useCaseOutput.currentPage,
        lastPage: useCaseOutput.lastPage,
        perPage: useCaseOutput.perPage,
      },
    };

    const result = await controller.list(query);

    expect(listUseCase.execute).toHaveBeenCalledWith(query);
    expect(result).toEqual(expectedOutput);
  });
});
