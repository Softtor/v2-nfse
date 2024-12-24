import { FiscalEmitterEntity } from '../../fiscal-emitter.entity';

describe('FiscalEmitterEntity End-to-End Tests', () => {
  it('should create, update, and validate an entity lifecycle', () => {
    const props = {
      name: 'Company X',
      document: '123456789',
      email: 'email@example.com',
      nickname: 'CompX',
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
      aliquot: 5.0,
      iss: 2.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = new FiscalEmitterEntity(props);

    expect(entity).toBeDefined();
    expect(entity.name).toBe(props.name);
    expect(entity.document).toBe(props.document);
    expect(entity.email).toBe(props.email);
    expect(entity.nickname).toBe(props.nickname);
    expect(entity.crt).toBe(props.crt);
    expect(entity.ie).toBe(props.ie);
    expect(entity.im).toBe(props.im);
    expect(entity.cnaeCode).toBe(props.cnaeCode);
    expect(entity.activityCode).toBe(props.activityCode);
    expect(entity.aliquot).toBe(props.aliquot);
    expect(entity.iss).toBe(props.iss);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);

    const updatedProps = {
      name: 'Company C',
      email: 'email@companyc.com',
      nickname: 'CompC',
      aliquot: 8.0,
      iss: 3.0,
    };
    entity.update(updatedProps);

    expect(entity.name).toBe(updatedProps.name);
    expect(entity.email).toBe(updatedProps.email);
    expect(entity.nickname).toBe(updatedProps.nickname);
    expect(entity.aliquot).toBe(updatedProps.aliquot);
    expect(entity.iss).toBe(updatedProps.iss);

    expect(() => entity.update({ name: '' })).toThrow();
  });
});
