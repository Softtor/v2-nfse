import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { NfseProps } from '../interfaces/nfse.interface';
import { NfseEntityValidatorFactory } from '../validators/nfse.entity-validator';
import { Entity } from './entity';

export class NfseEntity extends Entity<NfseProps> {
  constructor(props: NfseProps) {
    super(props);
  }

  valiadate(props: NfseProps) {
    const validator = NfseEntityValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get number() {
    return this.props.number;
  }

  set number(number: string) {
    this.props.number = number;
  }

  get verificationCode() {
    return this.props.verificationCode;
  }

  set verificationCode(verificationCode: string) {
    this.props.verificationCode = verificationCode;
  }

  get issueDate() {
    return this.props.issueDate;
  }

  set issueDate(issueDate: string) {
    this.props.issueDate = issueDate;
  }

  get rpsIdentification() {
    return this.props.rpsIdentification;
  }

  set rpsIdentification(rpsIdentification: {
    number: string;
    series: string;
    type: string;
  }) {
    this.props.rpsIdentification = rpsIdentification;
  }

  get operationNature() {
    return this.props.operationNature;
  }

  set operationNature(operationNature: string) {
    this.props.operationNature = operationNature;
  }

  get specialTaxRegime() {
    return this.props.specialTaxRegime;
  }

  set specialTaxRegime(specialTaxRegime: string) {
    this.props.specialTaxRegime = specialTaxRegime;
  }

  get simpleNationalOption() {
    return this.props.simpleNationalOption;
  }

  set simpleNationalOption(simpleNationalOption: string) {
    this.props.simpleNationalOption = simpleNationalOption;
  }

  get culturalIncentive() {
    return this.props.culturalIncentive;
  }

  set culturalIncentive(culturalIncentive: string) {
    this.props.culturalIncentive = culturalIncentive;
  }

  get competence() {
    return this.props.competence;
  }

  set competence(competence: string) {
    this.props.competence = competence;
  }

  get replacedNfse() {
    return this.props.replacedNfse;
  }

  set replacedNfse(replacedNfse: string) {
    this.props.replacedNfse = replacedNfse;
  }

  get services() {
    return this.props.service;
  }

  set services(service: {
    values: {
      serviceValue: number;
      deductionNumber?: number;
      deductionValue: number;
      pisValue: number;
      cofinsValue: number;
      inssValue: number;
      irValue: number;
      csllValue: number;
      withheldIss: 1 | 2;
      issValue: number;
      withheldIssValue?: string;
      netNfseValue: number;
      otherRetentions: number;
      calculationBase: number;
      rate: number;
      unconditionalDiscount?: number;
      conditionalDiscount?: number;
    };
    serviceListItem: string;
    cnaeCode: number;
    municipalTaxationCode: string;
    description: string;
    municipalityCode: number;
  }) {
    this.props.service = service;
  }

  get creditValue() {
    return this.props.creditValue;
  }

  set creditValue(creditValue: number) {
    this.props.creditValue = creditValue;
  }

  get serviceProvider() {
    return this.props.serviceProvider;
  }

  set serviceProvider(serviceProvider: {
    providerIdentification: {
      cnpj: string;
      municipalRegistration: string;
    };
    tradeName: string;
    address: {
      street: string;
      number: string;
      neighborhood: string;
      municipalityCode: number;
      state: string;
      zipCode: string;
    };
  }) {
    this.props.serviceProvider = serviceProvider;
  }

  get serviceRecipient() {
    return this.props.serviceRecipient;
  }

  set serviceRecipient(serviceRecipient: {
    recipientIdentification: {
      cpfCnpj: {
        cpf?: string;
        cnpj?: string;
      };
    };
    businessName: string;
    address: {
      municipalityCode: number;
      zipCode: string;
    };
    contact?: {
      phone?: string;
      email?: string;
    } | null;
  }) {
    this.props.serviceRecipient = serviceRecipient;
  }
}
