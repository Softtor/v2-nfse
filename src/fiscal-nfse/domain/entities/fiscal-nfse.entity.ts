import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export interface FiscalNfseProps {
  number: number;
  verificationCode: string;
  issueDate: Date;
  rpsNumber: string;
  rpsIssueDate: Date;
  competence: Date;
  providerId?: string;
  takerId?: string;
  rpsId: string;
  xml?: string;
  base64Pdf?: string;
  sentAt?: Date;
  createdAt?: Date;
}

export class FiscalNfseEntity extends Entity<FiscalNfseProps> {
  constructor(props: FiscalNfseProps, id?: string) {
    // FiscalNfseEntity.validate(props);
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
  }

  update(value: Partial<FiscalNfseProps>): void {
    Object.assign(this.props, value);
    // FiscalNfseEntity.validate(this.props);
  }

  // static validate(props: FiscalNfseProps) {
  //   const isValid = validator.validate(props);
  //   if (!isValid) {
  //     throw new EntityValidationError(validator.errors);
  //   }
  // }

  get takerId() {
    return this.props.takerId;
  }

  get rpsId() {
    return this.props.rpsId;
  }

  get number() {
    return this.props.number;
  }

  get verificationCode() {
    return this.props.verificationCode;
  }

  get issueDate() {
    return this.props.issueDate;
  }

  get rpsNumber() {
    return this.props.rpsNumber;
  }

  get rpsIssueDate() {
    return this.props.rpsIssueDate;
  }

  get competence() {
    return this.props.competence;
  }

  get providerId() {
    return this.props.providerId;
  }

  get sentAt() {
    return this.props.sentAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get xml() {
    return this.props.xml;
  }

  get base64Pdf() {
    return this.props.base64Pdf;
  }
}
