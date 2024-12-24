import { ProviderEntity } from '../../provider.entity';

describe('ProviderEntity', () => {
  it('should create a ProviderEntity instance with valid properties', () => {
    const provider = new ProviderEntity({
      municipalSubscription: '123456',
      cnpj: '12345678901234',
    });

    expect(provider.municipalSubscription).toBe('123456');
    expect(provider.cnpj).toBe('12345678901234');
    expect(provider.cpf).toBeUndefined();
    expect(provider.isCompany).toBe(true);
    expect(provider.isPerson).toBe(false);
  });

  it('should set and get cnpj correctly', () => {
    const provider = new ProviderEntity({
      municipalSubscription: '123456',
      cnpj: '12345678901234',
    });

    provider.cnpj = '98765432109876';
    expect(provider.cnpj).toBe('98765432109876');
  });

  it('should set and get cpf correctly', () => {
    const provider = new ProviderEntity({
      municipalSubscription: '123456',
      cpf: '12345678901',
    });

    provider.cpf = '10987654321';
    expect(provider.cpf).toBe('10987654321');
  });

  it('should set and get municipalSubscription correctly', () => {
    const provider = new ProviderEntity({
      municipalSubscription: '123456',
    });

    provider.municipalSubscription = '654321';
    expect(provider.municipalSubscription).toBe('654321');
  });

  it('should identify as a company if cnpj is present', () => {
    const provider = new ProviderEntity({
      municipalSubscription: '123456',
      cnpj: '12345678901234',
    });

    expect(provider.isCompany).toBe(true);
    expect(provider.isPerson).toBe(false);
  });

  it('should identify as a person if cpf is present', () => {
    const provider = new ProviderEntity({
      municipalSubscription: '123456',
      cpf: '12345678901',
    });

    expect(provider.isCompany).toBe(false);
    expect(provider.isPerson).toBe(true);
  });
});
