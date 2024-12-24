import { Entity } from './entity';
import { AddressEntityValidatorFactory } from '../validators/address.entity-validator';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';

export type AddressProps = {
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  municipalityCode: string;
  state: string;
  postalCode: string;
};

export class AddressEntity extends Entity<AddressProps> {
  constructor(props: AddressProps) {
    super(props);
    this.validate();
  }

  validate(): void {
    const validator = AddressEntityValidatorFactory.create();
    const isValid = validator.validate(this.props);
    if (!isValid) {
      console.error(validator.errors);
      throw new EntityValidationError(validator.errors);
    }
  }

  get address(): string {
    return this.props.address;
  }

  set address(value: string) {
    this.props.address = value;
    this.validate();
  }

  get number(): string {
    return this.props.number;
  }

  set number(value: string) {
    this.props.number = value;
    this.validate();
  }

  get complement(): string | undefined {
    return this.props.complement;
  }

  set complement(value: string | undefined) {
    this.props.complement = value;
    this.validate();
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  set neighborhood(value: string) {
    this.props.neighborhood = value;
    this.validate();
  }

  get municipalityCode(): string {
    return this.props.municipalityCode;
  }

  set municipalityCode(value: string) {
    this.props.municipalityCode = value;
    this.validate();
  }

  get state(): string {
    return this.props.state;
  }

  set state(value: string) {
    this.props.state = value;
    this.validate();
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  set postalCode(value: string) {
    this.props.postalCode = value;
    this.validate();
  }
}
