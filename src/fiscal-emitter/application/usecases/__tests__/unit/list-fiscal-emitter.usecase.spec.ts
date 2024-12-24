import {
  ListFiscalEmitterInput,
  ListFiscalEmitterUseCase,
} from '../../list-fiscal-emitter.usecase';
import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('ListFiscalEmitterUseCase Unit Tests', () => {
  let useCase: ListFiscalEmitterUseCase;
  let repository: jest.Mocked<FiscalEmitterRepository>;

  beforeEach(() => {
    repository = {
      search: jest.fn(),
    } as unknown as jest.Mocked<FiscalEmitterRepository>;

    useCase = new ListFiscalEmitterUseCase(repository);
  });

  it('should return a paginated list of fiscal emitters', async () => {
    const mockEntity1 = new FiscalEmitterEntity({
      name: 'Company A',
      document: '111111111',
      address: 'Address 1',
      number: '10',
      complement: 'Suite 100',
      neighborhood: 'Neighborhood 1',
      state: 'State 1',
      cityCode: 123,
      zipCode: '12345-000',
      crt: 'CRT001',
      ie: 'IE001',
      im: 'IM001',
      cnaeCode: '12345',
      activityCode: '67890',
      aliquot: 5.0,
      iss: 2.0,
      email: 'a@company.com',
      nickname: 'ACompany',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockEntity2 = new FiscalEmitterEntity({
      name: 'Company B',
      document: '222222222',
      address: 'Address 2',
      number: '20',
      complement: 'Suite 200',
      neighborhood: 'Neighborhood 2',
      state: 'State 2',
      cityCode: 456,
      zipCode: '12345-111',
      crt: 'CRT002',
      ie: 'IE002',
      im: 'IM002',
      cnaeCode: '54321',
      activityCode: '09876',
      aliquot: 7.0,
      iss: 3.0,
      email: 'b@company.com',
      nickname: 'BCompany',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    repository.search.mockResolvedValue({
      items: [mockEntity1, mockEntity2],
      total: 2,
      currentPage: 1,
      perPage: 10,
      sort: 'name',
      sortDir: 'asc',
      filter: '',
      lastPage: 1,
      toJSON: () => ({
        items: [mockEntity1, mockEntity2],
        total: 2,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: '',
        lastPage: 1,
      }),
    });

    const input: ListFiscalEmitterInput = {
      page: 1,
      perPage: 10,
      sort: 'name',
      sortDir: 'asc' as SortDirection,
      filter: '',
    };

    const result = await useCase.execute(input);

    expect(repository.search).toHaveBeenCalledWith(
      expect.objectContaining({
        _filter: null,
        _page: input.page,
        _perPage: input.perPage,
        _sort: input.sort,
        _sortDir: input.sortDir,
      }),
    );
    expect(result.items).toHaveLength(2);
    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Company A' }),
        expect.objectContaining({ name: 'Company B' }),
      ]),
    );
    expect(result.total).toBe(2);
    expect(result.currentPage).toBe(1);
    expect(result.perPage).toBe(10);
  });

  it('should return an empty list when no fiscal emitters are found', async () => {
    repository.search.mockResolvedValue({
      items: [],
      total: 0,
      currentPage: 1,
      perPage: 10,
      sort: 'name',
      sortDir: 'asc',
      filter: '',
      lastPage: 1,
      toJSON: () => ({
        items: [],
        total: 0,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: '',
        lastPage: 1,
      }),
    });

    const input: ListFiscalEmitterInput = {
      page: 1,
      perPage: 10,
      sort: 'name',
      sortDir: 'asc' as SortDirection,
      filter: '',
    };

    const result = await useCase.execute(input);

    expect(repository.search).toHaveBeenCalledWith(
      expect.objectContaining({
        _filter: null,
        _page: input.page,
        _perPage: input.perPage,
        _sort: input.sort,
        _sortDir: input.sortDir,
      }),
    );
    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.currentPage).toBe(1);
    expect(result.perPage).toBe(10);
  });
});
