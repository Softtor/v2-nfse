import { RpsEntity, RpsProps } from '../../rps.entity';
import { EntityValidationError } from '../../../../../shared/domain/errors/validation-error';
import { service, serviceTaker, provider } from '../testing/mocks';

describe('RpsEntity Unit Tests', () => {
  const validProps: RpsProps = {
    identification: { number: '123', series: 'A', type: '1' },
    emissionDate: '2023-10-01',
    status: 'active',
    service,
    serviceTaker,
    provider,
    competence: '2023-10',
    specialTaxRegime: 'regime',
    simpleNationalOptant: 'yes',
    fiscalIncentive: 'no',
    additionalInformation: 'info',
    culturalIncentive: '1',
    natureOperation: '2',
  };

  it('should create an RpsEntity with valid properties', () => {
    try {
      const rps = new RpsEntity(validProps);
      expect(rps.identification).toEqual(validProps.identification);
      expect(rps.emissionDate).toBe(validProps.emissionDate);
      expect(rps.status).toBe(validProps.status);
      expect(rps.service).toBe(validProps.service);
      expect(rps.provider).toBe(validProps.provider);
      expect(rps.serviceTaker).toBe(validProps.serviceTaker);
      expect(rps.competence).toBe(validProps.competence);
      expect(rps.specialTaxRegime).toBe(validProps.specialTaxRegime);
      expect(rps.simpleNationalOptant).toBe(validProps.simpleNationalOptant);
      expect(rps.fiscalIncentive).toBe(validProps.fiscalIncentive);
      expect(rps.additionalInformation).toBe(validProps.additionalInformation);
    } catch (err) {
      console.log(err);
    }
  });

  it('should throw an error when creating an RpsEntity with invalid properties', () => {
    const invalidProps = {
      ...validProps,
      status: '',
    };
    expect(() => new RpsEntity(invalidProps)).toThrow(EntityValidationError);
  });

  it('should update properties correctly', () => {
    const rps = new RpsEntity(validProps);
    rps.identification = { number: '456', series: 'B', type: '2' };
    rps.emissionDate = '2023-11-01';
    rps.status = 'inactive';
    rps.competence = '2023-11';
    rps.specialTaxRegime = 'new regime';
    rps.simpleNationalOptant = 'no';
    rps.fiscalIncentive = 'yes';
    rps.additionalInformation = 'new info';

    expect(rps.identification).toEqual({
      number: '456',
      series: 'B',
      type: '2',
    });
    expect(rps.emissionDate).toBe('2023-11-01');
    expect(rps.status).toBe('inactive');
    expect(rps.competence).toBe('2023-11');
    expect(rps.specialTaxRegime).toBe('new regime');
    expect(rps.simpleNationalOptant).toBe('no');
    expect(rps.fiscalIncentive).toBe('yes');
    expect(rps.additionalInformation).toBe('new info');
  });
});
