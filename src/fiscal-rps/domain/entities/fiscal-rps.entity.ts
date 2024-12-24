import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalRpsValidatorFactory } from '../validators/fiscal-rps.validator';

export interface FiscalRpsProps {
  number: number;
  series: string;
  issueDateRps?: Date;
  type: string;
  status: string;
  competence?: Date;
  complementaryInformation?: string;
  serviceId: string;
  takerId: string;
  providerId?: string;
  batchId?: string;
  paymentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FiscalRpsEntity extends Entity<FiscalRpsProps> {
  constructor(
    public readonly props: FiscalRpsProps,
    id?: string,
  ) {
    FiscalRpsEntity.validate(props);
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
  }

  update(value: Partial<FiscalRpsProps>): void {
    if (value.createdAt) {
      delete value.createdAt;
    }
    Object.assign(this.props, value);
    this.props.updatedAt = new Date();
    FiscalRpsEntity.validate(this.props);
  }

  get number() {
    return this.props.number;
  }

  get series() {
    return this.props.series;
  }

  get issueDateRps() {
    return this.props.issueDateRps;
  }

  get type() {
    return this.props.type;
  }

  get paymentId() {
    return this.props.paymentId;
  }

  get status() {
    return this.props.status;
  }

  get competence() {
    return this.props.competence;
  }

  get complementaryInformation() {
    return this.props.complementaryInformation;
  }

  get serviceId() {
    return this.props.serviceId;
  }

  get takerId() {
    return this.props.takerId;
  }

  get providerId() {
    return this.props.providerId;
  }

  get batchId() {
    return this.props.batchId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static validate(props: FiscalRpsProps) {
    const validator = FiscalRpsValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      console.error(validator.errors);
      throw new EntityValidationError(validator.errors);
    }
  }
}
