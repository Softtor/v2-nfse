import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FiscalServiceProps } from '../entities/fiscal-service.entity';

export class FiscalServiceRules {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  serviceValue: number;

  @IsNumber()
  @IsOptional()
  deductionValue?: number;

  @IsNumber()
  @IsNotEmpty()
  pisValue: number;

  @IsNumber()
  @IsOptional()
  cofinsValue?: number;

  @IsNumber()
  @IsOptional()
  inssValue?: number;

  @IsNumber()
  @IsOptional()
  irValue?: number;

  @IsNumber()
  @IsOptional()
  csllValue?: number;

  @IsNumber()
  @IsOptional()
  otherRetentions?: number;

  @IsNumber()
  @IsOptional()
  totalTributesValue?: number;

  @IsNumber()
  @IsOptional()
  issValue?: number;

  @IsNumber()
  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  nbsCode?: string;

  @IsNumber()
  @IsOptional()
  unconditionalDiscount?: number;

  @IsNumber()
  @IsOptional()
  conditionalDiscount?: number;

  @IsNumber()
  @IsOptional()
  issWithheld?: number;

  @IsString()
  @IsNotEmpty()
  serviceItemList: string;

  @IsString()
  @IsNotEmpty()
  cnaeCode: string;

  @IsString()
  @IsOptional()
  municipalTaxationCode?: string;

  @IsString()
  @IsNotEmpty()
  serviceDescription: string;

  @IsString()
  @IsNotEmpty()
  municipalityCode: string;

  @IsNumber()
  @IsNotEmpty()
  issExigibility: number;

  @IsString()
  @IsNotEmpty()
  incidenceMunicipality: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  constructor(props: FiscalServiceRules) {
    Object.assign(this, props);
  }
}

export class FiscalServiceValidator extends ClassValidatorFields<FiscalServiceRules> {
  validate(data: FiscalServiceRules): boolean {
    return super.validate(
      new FiscalServiceRules(data ?? ({} as FiscalServiceProps)),
    );
  }
}

export class FiscalServiceValidatorFactory {
  static create(): FiscalServiceValidator {
    return new FiscalServiceValidator();
  }
}
