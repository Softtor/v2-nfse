import { ProviderMapper } from '../../provider.mapper';
import { provider } from '../testing/mocks';
import { ProviderEntity } from '@/nfse/domain/entities/provider.entity';
describe('ProviderMapper', () => {
  it('should map ProviderEntity to WsProvider correctly', () => {
    const providerEntity = new ProviderEntity(provider);

    const mapper = new ProviderMapper(providerEntity);
    const wsProvider = mapper.toWS();

    expect(wsProvider).toEqual({
      Prestador: {
        InscricaoMunicipal: providerEntity.municipalSubscription,
        Cnpj: providerEntity.cnpj,
      },
    });
  });

  it('should map ProviderEntity to WsProvider without Cnpj', () => {
    const providerEntity = new ProviderEntity(provider);

    const mapper = new ProviderMapper(providerEntity);
    const wsProvider = mapper.toWS();

    expect(wsProvider).toEqual({
      Prestador: {
        InscricaoMunicipal: providerEntity.municipalSubscription,
        Cnpj: providerEntity.cnpj,
      },
    });
  });
});
