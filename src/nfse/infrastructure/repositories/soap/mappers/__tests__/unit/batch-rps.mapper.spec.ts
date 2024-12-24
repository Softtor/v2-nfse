import { BatchRpsMapper, WsBatchRps } from '../../batch-rps.mapper';
import { BatchRpsEntity } from '@/nfse/domain/entities/batch-rps.entity';
import { ProviderEntity } from '@/nfse/domain/entities/provider.entity';
import { RpsEntity } from '@/nfse/domain/entities/rps.entity';
import { service, provider, serviceTaker } from '../testing/mocks';

describe('BatchRpsMapper', () => {
  it('deve mapear BatchRpsEntity para WsBatchRps corretamente', () => {
    const batchRpsProps = {
      batchNumber: '123456789012345',
      provider,
      rpsQuantity: 2,
      rpsList: [
        {
          identification: {
            number: '1',
            series: 'A1',
            type: '1',
          },
          emissionDate: '2023-10-10',
          status: 'Ativo',
          service,
          provider,
          serviceTaker,
          competence: '2023-10',
          specialTaxRegime: 'Normal',
          simpleNationalOptant: 'Não',
          fiscalIncentive: 'Não',
          additionalInformation: 'Informações adicionais 1',
        },
        {
          identification: {
            number: '2',
            series: 'A2',
            type: '2',
          },
          emissionDate: '2023-10-11',
          status: 'Inativo',
          service,
          provider,
          serviceTaker,
          competence: '2023-10',
          specialTaxRegime: 'Especial',
          simpleNationalOptant: 'Sim',
          fiscalIncentive: 'Sim',
          additionalInformation: 'Informações adicionais 2',
        },
      ],
    };

    const batchRpsEntity = new BatchRpsEntity(batchRpsProps);
    const batchRpsMapper = new BatchRpsMapper(batchRpsEntity);
    const wsBatchRps: WsBatchRps = batchRpsMapper.toWS();

    expect(wsBatchRps.LoteRps.NumeroLote).toBe('123456789012345');
    expect(wsBatchRps.LoteRps.QuantidadeRps).toBe(2);
    expect(wsBatchRps.LoteRps.ListaRps.length).toBe(2);
  });

  it('Should map batchRps correctly', () => {
    const batchRpsProps = {
      batchNumber: '543210987654321',
      provider,
      rpsQuantity: 0,
      rpsList: [],
    };

    const batchRpsEntity = new BatchRpsEntity(batchRpsProps);
    const batchRpsMapper = new BatchRpsMapper(batchRpsEntity);
    const wsBatchRps: WsBatchRps = batchRpsMapper.toWS();

    expect(wsBatchRps.LoteRps.NumeroLote).toBe('543210987654321');
    expect(wsBatchRps.LoteRps.QuantidadeRps).toBe(0);
    expect(wsBatchRps.LoteRps.ListaRps.length).toBe(0);
  });

  it('deve mapear BatchRpsEntity com um único RPS corretamente', () => {
    const batchRpsProps = {
      batchNumber: '111222333444555',
      provider,
      rpsQuantity: 1,
      rpsList: [
        {
          identification: {
            number: '10',
            series: 'B1',
            type: '1',
          },
          emissionDate: '2023-09-15',
          status: 'Ativo',
          service,
          provider,
          serviceTaker,
          competence: '2023-09',
          specialTaxRegime: 'Normal',
          simpleNationalOptant: 'Não',
          fiscalIncentive: 'Sim',
          additionalInformation: 'Informações adicionais únicas',
        },
      ],
    };

    const batchRpsEntity = new BatchRpsEntity(batchRpsProps);
    const batchRpsMapper = new BatchRpsMapper(batchRpsEntity);
    const wsBatchRps: WsBatchRps = batchRpsMapper.toWS();

    expect(wsBatchRps.LoteRps.NumeroLote).toBe('111222333444555');
    expect(wsBatchRps.LoteRps.QuantidadeRps).toBe(1);
    expect(wsBatchRps.LoteRps.ListaRps.length).toBe(1);
  });
});
