import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalBatchNfseValidatorFactory } from '../validators/fiscal-bach.validator';

export interface FiscalBatchNfseProps {
  name: string;
  sentAt?: Date;
  providerId?: string;
  protocol?: string;
  receiptDate?: Date;
  batchNumber?: string;
  confirmedSentWs?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FiscalBatchNfseEntity extends Entity<FiscalBatchNfseProps> {
  constructor(
    props: Omit<FiscalBatchNfseProps, 'name'> & { name?: string },
    id?: string,
  ) {
    const propsWithDefaults = { ...props, name: props.name ?? undefined };
    FiscalBatchNfseEntity.validate(propsWithDefaults);
    super(propsWithDefaults, id);

    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
  }

  static validate(props: Partial<FiscalBatchNfseProps>): void {
    const validator = FiscalBatchNfseValidatorFactory.create();
    const isValid = validator.validate({ ...props, name: props.name ?? '' });
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
  update(value: Partial<Omit<FiscalBatchNfseProps, 'name'>>): void {
    Object.assign(this.props, value);
    this.props.updatedAt = new Date();
    FiscalBatchNfseEntity.validate(this.props);
  }

  get name() {
    return this.props.name;
  }

  get sentAt() {
    return this.props.sentAt;
  }

  get protocol() {
    return this.props.protocol;
  }

  get receiptDate() {
    return this.props.receiptDate;
  }

  get batchNumber() {
    return this.props.batchNumber;
  }

  get providerId() {
    return this.props.providerId;
  }

  get confirmedSentWs() {
    return this.props.confirmedSentWs;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set protocol(value: string | undefined) {
    this.props.protocol = value;
    this.props.updatedAt = new Date();
  }

  set batchNumber(value: string | undefined) {
    this.props.batchNumber = value;
    this.props.updatedAt = new Date();
  }

  set receiptDate(value: Date | undefined) {
    this.props.receiptDate = value;
    this.props.updatedAt = new Date();
  }

  set confirmedSentWs(value: boolean | undefined) {
    this.props.confirmedSentWs = value;
    this.props.updatedAt = new Date();
  }
}
