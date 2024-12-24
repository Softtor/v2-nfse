import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalTakerValidatorFactory } from '../validators/fiscal-taker.validator';

export interface FiscalTakerProps {
  document: string;
  name: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  cityCode: string;
  state: string;
  zipCode: string;
  isForeign: boolean;
  countryCode?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FiscalTakerEntity extends Entity<FiscalTakerProps> {
  constructor(
    public readonly props: FiscalTakerProps,
    id?: string,
  ) {
    FiscalTakerEntity.validate(props);
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
  }

  update(value: Partial<FiscalTakerProps>): void {
    if (value.createdAt) {
      delete value.createdAt;
    }
    Object.assign(this.props, value);
    this.props.updatedAt = new Date();
    FiscalTakerEntity.validate(this.props);
  }

  get document() {
    return this.props.document;
  }

  get name() {
    return this.props.name;
  }

  get address() {
    return this.props.address;
  }

  get number() {
    return this.props.number;
  }

  get complement() {
    return this.props.complement;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get cityCode() {
    return this.props.cityCode;
  }

  get state() {
    return this.props.state;
  }

  get zipCode() {
    return this.props.zipCode;
  }

  get isForeign() {
    return this.props.isForeign;
  }

  get countryCode() {
    return this.props.countryCode;
  }

  get phone() {
    return this.props.phone;
  }

  get email() {
    return this.props.email;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static validate(props: FiscalTakerProps) {
    const validator = FiscalTakerValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      console.error(validator.errors);
      throw new EntityValidationError(validator.errors);
    }
  }
}
