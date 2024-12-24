import { PrismaClient, FiscalEmitter } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { FiscalEmitterModelMapper } from '../../fiscal-emitter-model.mapper';

describe('FiscalEmitterModelMapper integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.fiscalEmitter.deleteMany();
    props = {
      id: 'some-id',
      name: 'Test Company',
      document: '123456789',
      email: 'test@company.com',
      nickname: 'TestNick',
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
      created_at: new Date(),
      updated_at: new Date(),
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when fiscal emitter model is invalid', async () => {
    const model: FiscalEmitter = Object.assign(props, { name: null });
    expect(() => FiscalEmitterModelMapper.toEntity(model)).toThrow(
      ValidationError,
    );
  });

  it('should convert a fiscal emitter model to a fiscal emitter entity', async () => {
    const model: FiscalEmitter = await prismaService.fiscalEmitter.create({
      data: {
        id: props.id,
        name: props.name,
        document: props.document,
        email: props.email,
        nickname: props.nickname,
        address: props.address,
        number: props.number,
        complement: props.complement,
        neighborhood: props.neighborhood,
        state: props.state,
        city_code: props.city_code,
        zip_code: props.zip_code,
        crt: props.crt,
        ie: props.ie,
        im: props.im,
        cnae_code: props.cnae_code,
        activity_code: props.activity_code,
        aliquot: props.aliquot,
        iss: props.iss,
        created_at: props.created_at,
        updated_at: props.updated_at,
      },
    });

    const entity = FiscalEmitterModelMapper.toEntity(model);

    expect(entity).toBeInstanceOf(FiscalEmitterEntity);
    expect(entity.toJSON()).toStrictEqual({
      id: props.id,
      name: props.name,
      document: props.document,
      email: props.email,
      nickname: props.nickname,
      address: props.address,
      number: props.number,
      complement: props.complement,
      neighborhood: props.neighborhood,
      state: props.state,
      cityCode: props.city_code,
      zipCode: props.zip_code,
      crt: props.crt,
      ie: props.ie,
      im: props.im,
      cnaeCode: props.cnae_code,
      activityCode: props.activity_code,
      aliquot: props.aliquot,
      iss: props.iss,
      createdAt: props.created_at,
      updatedAt: props.updated_at,
    });
  });
});
