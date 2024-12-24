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

export const addressProps = address;

export const nfseMock = {
  number: '123',
  verificationCode: 'abc123',
  issueDate: '2023-10-01',
  rpsIdentification: {
    number: '123',
    series: 'A',
    type: '1',
  },
  rpsIssueDate: '2023-10-01',
  operationNature: 'Natureza Operacao',
  specialTaxRegime: 'regime',
  simpleNationalOption: 'yes',
  culturalIncentive: 'no',
  competence: '2023-10',
  replacedNfse: 'Nfse Substituida',
  service: {
    values: {
      serviceValue: 1000,
      deductionNumber: 100,
      deductionValue: 100,
      pisValue: 10,
      cofinsValue: 20,
      inssValue: 30,
      irValue: 40,
      csllValue: 50,
      withheldIss: 'yes',
      issValue: 80,
      withheldIssValue: 70,
      otherRetentions: 60,
      calculationBase: 5000,
      rate: 5,
      netNfseValue: 950,
      unconditionalDiscount: 0,
      conditionalDiscount: 0,
    },
    serviceListItem: 'item1',
    cnaeCode: 5678,
    municipalTaxationCode: '91011',
    description: 'Test Service',
    municipalityCode: 12345,
  },
  creditValue: 100,
  serviceProvider: {
    providerIdentification: {
      cnpj: '12345678901234',
      municipalRegistration: '123456',
    },
    tradeName: 'Provider Name',
    address: {
      street: '123 Main St',
      number: '456',
      neighborhood: 'Downtown',
      municipalityCode: 1234567,
      state: 'CA',
      zipCode: '12345-678',
    },
  },
  serviceRecipient: {
    recipientIdentification: {
      cpfCnpj: {
        cnpj: '33.779.923/0001-42',
        cpf: '',
      },
    },
    businessName: 'Softtor',
    address: {
      municipalityCode: 1234567,
      zipCode: '12345-678',
    },
    contact: {
      phone: '11999999999',
      email: 'exemplo@empresa.com.br',
    },
  },
};
