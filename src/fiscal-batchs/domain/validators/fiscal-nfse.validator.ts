import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FiscalNfseProps } from '../entities/fiscal-nfse.entity';

export class FiscalNfseRules {
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  verificationCode: string;

  @IsDate()
  @IsNotEmpty()
  issueDate: Date;

  @IsString()
  @IsNotEmpty()
  rpsNumber: string;

  @IsDate()
  @IsNotEmpty()
  rpsIssueDate: Date;

  @IsDate()
  @IsNotEmpty()
  competence: Date;

  @IsString()
  @IsOptional()
  providerId?: string;

  @IsString()
  @IsOptional()
  takerId?: string;

  @IsString()
  @IsNotEmpty()
  rpsId: string;

  @IsDate()
  @IsOptional()
  sentAt?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor(props: FiscalNfseRules) {
    Object.assign(this, props);
  }
}

export class FiscalNfseValidator extends ClassValidatorFields<FiscalNfseRules> {
  validate(data: FiscalNfseRules): boolean {
    return super.validate(new FiscalNfseRules(data ?? ({} as FiscalNfseProps)));
  }
}

export class FiscalNfseValidatorFactory {
  static create(): FiscalNfseValidator {
    return new FiscalNfseValidator();
  }
}
