import { Entity } from './entity';
import { ServiceProps } from './service.entity';
import { ProviderProps } from './provider.entity';
import { ServiceTakerProps } from './service-taker.entity';
import { RpsEntityValidatorFactory } from '../validators/rps.entity-validator';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';

export type IdentificationRps = {
  number: string;
  series: string;
  type: string;
};

export type RpsProps = {
  identification: IdentificationRps;
  emissionDate: string;
  status: string;
  service: ServiceProps;
  provider: ProviderProps;
  serviceTaker: ServiceTakerProps;
  competence: string;
  specialTaxRegime: string;
  simpleNationalOptant: string;
  fiscalIncentive: string;
  additionalInformation: string;
  culturalIncentive: '1' | '2';
  natureOperation: string;
};

export class RpsEntity extends Entity<RpsProps> {
  constructor(props: RpsProps) {
    super(props);
    this.validate(props);
  }

  validate(props: RpsProps) {
    const validator = RpsEntityValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      console.log(validator.errors);
      throw new EntityValidationError(validator.errors);
    }
  }

  get natureOperation(): string {
    return this.props.natureOperation;
  }

  set natureOperation(value: string) {
    this.props.natureOperation = value;
  }

  get culturalIncentive(): '1' | '2' {
    return this.props.culturalIncentive;
  }

  set culturalIncentive(value: '1' | '2') {
    this.props.culturalIncentive = value;
  }

  get identification(): IdentificationRps {
    return this.props.identification;
  }

  set identification(value: IdentificationRps) {
    this.props.identification = value;
  }

  get emissionDate(): string {
    return this.props.emissionDate;
  }

  set emissionDate(value: string) {
    this.props.emissionDate = value;
  }

  get status(): string {
    return this.props.status;
  }

  set status(value: string) {
    this.props.status = value;
  }

  get service(): ServiceProps {
    return this.props.service;
  }

  set service(value: ServiceProps) {
    this.props.service = value;
  }

  get provider(): ProviderProps {
    return this.props.provider;
  }

  set provider(value: ProviderProps) {
    this.props.provider = value;
  }

  get serviceTaker(): ServiceTakerProps {
    return this.props.serviceTaker;
  }

  set serviceTaker(value: ServiceTakerProps) {
    this.props.serviceTaker = value;
  }

  get competence(): string {
    return this.props.competence;
  }

  set competence(value: string) {
    this.props.competence = value;
  }

  get specialTaxRegime(): string {
    return this.props.specialTaxRegime;
  }

  set specialTaxRegime(value: string) {
    this.props.specialTaxRegime = value;
  }

  get simpleNationalOptant(): string {
    return this.props.simpleNationalOptant;
  }

  set simpleNationalOptant(value: string) {
    this.props.simpleNationalOptant = value;
  }

  get fiscalIncentive(): string {
    return this.props.fiscalIncentive;
  }

  set fiscalIncentive(value: string) {
    this.props.fiscalIncentive = value;
  }

  get additionalInformation(): string {
    return this.props.additionalInformation;
  }

  set additionalInformation(value: string) {
    this.props.additionalInformation = value;
  }
}
