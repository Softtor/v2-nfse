export const provider = {
  municipalSubscription: '123456',
  cnpj: '12345678901234',
};
export const service = {
  serviceValue: 1000,
  deductionValue: 100,
  pisValue: 10,
  cofinsValue: 20,
  inssValue: 30,
  irValue: 40,
  csllValue: 50,
  otherRetentions: 60,
  totalTributesValue: 70,
  issValue: 80,
  rate: 5,
  nbsCode: '1234',
  unconditionalDiscount: 0,
  conditionalDiscount: 0,
  issWithheld: 0,
  serviceItemList: 'item1',
  cnaeCode: '5678',
  municipalTaxationCode: '91011',
  serviceDescription: 'Test Service',
  municipalityCode: '12345',
  issExigibility: 1,
  incidenceMunicipality: 'Test City',
};

export const address = {
  address: '123 Main St',
  number: '456',
  neighborhood: 'Downtown',
  municipalityCode: '1234567',
  state: 'CA',
  postalCode: '12345-678',
};

export const serviceTaker = {
  businessName: 'Softtor',
  cnpj: '33.779.923/0001-42', // Assuma que este é um CNPJ válido
  address,
  phone: '11999999999',
  email: 'exemplo@empresa.com.br',
};

export const rpsList = [
  {
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
  },
  {
    identification: { number: '456', series: 'B', type: '2' },
    emissionDate: '2023-11-01',
    status: 'inactive',
    service,
    serviceTaker,
    provider,
    competence: '2023-11',
    specialTaxRegime: 'new regime',
    simpleNationalOptant: 'no',
    fiscalIncentive: 'yes',
    additionalInformation: 'new info',
  },
];
