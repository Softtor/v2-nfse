import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { FiscalEmitterOutputDto } from '@/fiscal-emitter/application/dto/fiscal-emitter-output.dto';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { CreateFiscalEmitterUseCase } from '../../create-fiscal-emitter.usecase';

describe('CreateFiscalEmitterUseCase Unit Tests', () => {
  let useCase: CreateFiscalEmitterUseCase;
  let repository: jest.Mocked<FiscalEmitterRepository>;

  beforeEach(() => {
    repository = {
      findByDocument: jest.fn(),
      insert: jest.fn(),
    } as any;
    useCase = new CreateFiscalEmitterUseCase(repository);
  });

  it('should create a new fiscal emitter and return the correct output DTO', async () => {
    const input = {
      name: 'Test Company',
      document: '123456789',
      email: 'test@company.com',
      nickname: 'TestNick',
      address: '123 Main St',
      number: '101',
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

    const fixedDate = new Date('2024-12-12T12:00:00Z');
    jest.useFakeTimers().setSystemTime(fixedDate);

    const mockId = '123'; // ID fixo para o teste
    const mockEntity = new FiscalEmitterEntity(
      {
        ...input,
        createdAt: fixedDate,
        updatedAt: fixedDate,
      },
      mockId,
    );

    repository.findByDocument.mockResolvedValueOnce(null);
    repository.insert.mockImplementationOnce(async () => Promise.resolve());

    // Simula o mapeamento para saída
    jest
      .spyOn(FiscalEmitterEntity.prototype, 'id', 'get')
      .mockReturnValueOnce(mockId);

    const result = await useCase.execute(input);

    expect(repository.findByDocument).toHaveBeenCalledWith(input.document);
    expect(repository.insert).toHaveBeenCalledWith(
      expect.any(FiscalEmitterEntity),
    );

    expect(result).toEqual<FiscalEmitterOutputDto>({
      id: mockId,
      name: input.name,
      document: input.document,
      email: input.email,
      nickname: input.nickname,
      address: input.address,
      number: input.number,
      complement: input.complement,
      neighborhood: input.neighborhood,
      state: input.state,
      cityCode: input.cityCode,
      zipCode: input.zipCode,
      crt: input.crt,
      ie: input.ie,
      im: input.im,
      cnaeCode: input.cnaeCode,
      activityCode: input.activityCode,
      aliquot: input.aliquot,
      iss: input.iss,
      createdAt: fixedDate,
      updatedAt: fixedDate,
    });
  });

  it('should throw ConflictError if a fiscal emitter with the same document already exists', async () => {
    const input = {
      name: 'Test Company',
      document: '123456789',
      email: 'test@company.com',
      nickname: 'TestNick',
      address: '123 Main St',
      number: '101',
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

    repository.findByDocument.mockResolvedValueOnce({} as any);

    await expect(useCase.execute(input)).rejects.toThrow(ConflictError);

    expect(repository.findByDocument).toHaveBeenCalledWith(input.document);
    expect(repository.insert).not.toHaveBeenCalled();
  });
});
