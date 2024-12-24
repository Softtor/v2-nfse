import { PrismaClient } from '@prisma/client';
import { createPrismaMock } from '@/shared/prisma/__tests__/__mocks__/prisma.service.mock';
import { FiscalEmitterPrismaRepository } from '../../fiscal-emitter-prisma.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';

describe('FiscalEmitterPrismaRepository unit test', () => {
  let prismaMock: jest.Mocked<PrismaClient>;
  let repository: FiscalEmitterPrismaRepository;

  beforeEach(() => {
    prismaMock = createPrismaMock();
    repository = new FiscalEmitterPrismaRepository(prismaMock as any);
  });

  it('should find a fiscal emitter by document', async () => {
    const mockEntity = {
      id: '123',
      name: 'Test Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
      complement: 'Suite 200',
      neighborhood: 'Downtown',
      state: 'CA',
      city_code: 12345,
      zip_code: '12345-678',
      crt: 'CRT001',
      ie: 'IE001',
      im: 'IM001',
      cnae_code: '6201-5/00',
      activity_code: '12345',
      aliquot: 5.5,
      iss: 2.0,
      email: 'test@company.com',
      nickname: 'TestNick',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(prismaMock.fiscalEmitter, 'findUnique')
      .mockResolvedValueOnce(mockEntity as any);

    const result = await repository.findByDocument('123456789');

    expect(prismaMock.fiscalEmitter.findUnique).toHaveBeenCalledWith({
      where: { document: '123456789' },
    });
    expect(result.name).toBe('Test Company');
  });

  it('should throw NotFoundError if fiscal emitter is not found', async () => {
    jest.spyOn(prismaMock.fiscalEmitter, 'findUnique').mockResolvedValue(null);

    await expect(repository.findByDocument('123456789')).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should insert a fiscal emitter', async () => {
    const entity = new FiscalEmitterEntity({
      name: 'Test Company',
      document: '123456789',
      address: 'Main St',
      number: '10',
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
      email: 'test@company.com',
      nickname: 'TestNick',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (prismaMock.fiscalEmitter.create as jest.Mock).mockResolvedValue({
      id: entity.id,
      ...entity.props,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    });

    await repository.insert(entity);

    expect(prismaMock.fiscalEmitter.create).toHaveBeenCalledWith({
      data: {
        id: entity.id,
        name: entity.props.name,
        document: entity.props.document,
        address: entity.props.address,
        number: entity.props.number,
        complement: entity.props.complement,
        neighborhood: entity.props.neighborhood,
        state: entity.props.state,
        city_code: entity.props.cityCode,
        zip_code: entity.props.zipCode,
        crt: entity.props.crt,
        ie: entity.props.ie,
        im: entity.props.im,
        cnae_code: entity.props.cnaeCode,
        activity_code: entity.props.activityCode,
        aliquot: entity.props.aliquot,
        iss: entity.props.iss,
        email: entity.props.email,
        nickname: entity.props.nickname,
        created_at: entity.createdAt,
        updated_at: entity.updatedAt,
      },
    });
  });
  it('should update a fiscal emitter', async () => {
    const entity = new FiscalEmitterEntity({
      name: 'Updated Company',
      document: '123456789',
      address: 'Main St',
      number: '20',
      complement: 'Suite 200',
      neighborhood: 'Downtown',
      state: 'CA',
      cityCode: 12345,
      zipCode: '12345-678',
      crt: 'CRT002',
      ie: 'IE002',
      im: 'IM002',
      cnaeCode: '6201-5/01',
      activityCode: '54321',
      aliquot: 7.5,
      iss: 3.0,
      email: 'updated@company.com',
      nickname: 'UpdatedNick',
      updatedAt: new Date(),
    });

    jest.spyOn(prismaMock.fiscalEmitter, 'update').mockResolvedValue({
      ...entity.props,
      updated_at: entity.updatedAt,
      id: '53d0a4a4-1c9a-463f-b209-d64c7c3930ab',
      created_at: new Date(),
    } as any);

    await repository.update(entity);

    expect(prismaMock.fiscalEmitter.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: entity.id },
        data: expect.objectContaining({
          name: entity.props.name,
          document: entity.props.document,
          address: entity.props.address,
          number: entity.props.number,
          complement: entity.props.complement,
          neighborhood: entity.props.neighborhood,
          state: entity.props.state,
          city_code: entity.props.cityCode,
          zip_code: entity.props.zipCode,
          crt: entity.props.crt,
          ie: entity.props.ie,
          im: entity.props.im,
          cnae_code: entity.props.cnaeCode,
          activity_code: entity.props.activityCode,
          aliquot: entity.props.aliquot,
          iss: entity.props.iss,
          email: entity.props.email,
          nickname: entity.props.nickname,
          updated_at: entity.updatedAt,
        }),
      }),
    );
  });

  it('should delete a fiscal emitter', async () => {
    const id = '123';

    jest.spyOn(prismaMock.fiscalEmitter, 'delete').mockResolvedValue({
      id,
    } as any);
    await repository.delete(id);
    expect(prismaMock.fiscalEmitter.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });
});
