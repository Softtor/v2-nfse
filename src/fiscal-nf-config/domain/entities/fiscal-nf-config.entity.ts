import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalNfConfigValidatorFactory } from '../validators/fiscal-nf-config.validator';

export interface FiscalNfConfigProps {
  serie: string;
  nextDocumentNumber: number;
  simpleNational?: boolean;
  taxationRegime: string;
  operationNature?: string;
  culturalIncentive?: boolean;
  fiscalIncentive?: boolean;
  emitterId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FiscalNfConfigEntity extends Entity<FiscalNfConfigProps> {
  constructor(
    public readonly props: FiscalNfConfigProps,
    id?: string,
  ) {
    FiscalNfConfigEntity.validate(props);
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
  }

  update(value: Partial<FiscalNfConfigProps>): void {
    if (value.createdAt) {
      delete value.createdAt;
    }
    Object.assign(this.props, value);
    this.props.updatedAt = new Date();
    FiscalNfConfigEntity.validate(this.props);
  }

  get serie() {
    return this.props.serie;
  }

  private set serie(value: string) {
    this.props.serie = value;
  }

  get nextDocumentNumber() {
    return this.props.nextDocumentNumber;
  }

  private set nextDocumentNumber(value: number) {
    this.props.nextDocumentNumber = value;
  }

  get simpleNational() {
    return this.props.simpleNational;
  }

  private set simpleNational(value: boolean | undefined) {
    this.props.simpleNational = value;
  }

  get taxationRegime() {
    return this.props.taxationRegime;
  }

  private set taxationRegime(value: string) {
    this.props.taxationRegime = value;
  }

  get emitterId() {
    return this.props.emitterId;
  }

  private set emitterId(value: number) {
    this.props.emitterId = value;
  }

  get operationNature() {
    return this.props.operationNature;
  }

  private set operationNature(value: string) {
    this.props.operationNature = value;
  }

  get culturalIncentive() {
    return this.props.culturalIncentive;
  }

  private set culturalIncentive(value: boolean | undefined) {
    this.props.culturalIncentive = value;
  }

  get fiscalIncentive() {
    return this.props.fiscalIncentive;
  }

  private set fiscalIncentive(value: boolean | undefined) {
    this.props.fiscalIncentive = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static validate(props: FiscalNfConfigProps) {
    const validator = FiscalNfConfigValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
