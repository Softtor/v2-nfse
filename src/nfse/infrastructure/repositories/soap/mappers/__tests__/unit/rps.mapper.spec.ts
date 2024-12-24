import { RpsMapper } from '../../rps.mapper';
import { RpsEntity } from '@/nfse/domain/entities/rps.entity';
import { provider, service, serviceTaker } from '../testing/mocks';
describe('RpsMapper', () => {
  it('should map RpsEntity to WsRps correctly', () => {
    const rpsEntity = new RpsEntity({
      identification: {
        number: '123',
        series: 'A',
        type: '1',
      },
      emissionDate: '2023-10-01',
      status: 'active',
      service,
      provider,
      serviceTaker,
      competence: '2023-10',
      specialTaxRegime: 'regime',
      simpleNationalOptant: 'yes',
      fiscalIncentive: 'no',
      additionalInformation: 'info',
    });

    const rpsMapper = new RpsMapper(rpsEntity);
    const wsRps = rpsMapper.toWS();

    expect(wsRps.InfDeclaracaoPrestacaoServico.Rps.Status).toBe('active');
    expect(
      wsRps.InfDeclaracaoPrestacaoServico.Rps.IdentificacaoRps.Numero,
    ).toBe('123');
    expect(wsRps.InfDeclaracaoPrestacaoServico.Rps.IdentificacaoRps.Serie).toBe(
      'A',
    );
    expect(wsRps.InfDeclaracaoPrestacaoServico.Rps.IdentificacaoRps.Tipo).toBe(
      '1',
    );
    expect(wsRps.InfDeclaracaoPrestacaoServico.Rps.DataEmissao).toBe(
      '2023-10-01',
    );
    expect(wsRps.InfDeclaracaoPrestacaoServico.Competencia).toBe('2023-10');
    expect(wsRps.InfDeclaracaoPrestacaoServico.RegimeEspecialTributacao).toBe(
      'regime',
    );
    expect(wsRps.InfDeclaracaoPrestacaoServico.OptanteSimplesNacional).toBe(
      'yes',
    );
    expect(wsRps.InfDeclaracaoPrestacaoServico.IncentivoFiscal).toBe('no');
    expect(wsRps.InfDeclaracaoPrestacaoServico.InformacoesComplementares).toBe(
      'info',
    );
  });
});
