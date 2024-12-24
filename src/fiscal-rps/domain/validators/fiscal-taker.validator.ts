import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FiscalTakerProps } from '../entities/fiscal-taker.entity';

export class FiscalTakerRules {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  cityCode: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsBoolean()
  @IsNotEmpty()
  isForeign: boolean;

  @IsString()
  @IsOptional()
  countryCode?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor(props: FiscalTakerRules) {
    Object.assign(this, props);
  }
}

export class FiscalTakerValidator extends ClassValidatorFields<FiscalTakerRules> {
  validate(data: FiscalTakerRules): boolean {
    return super.validate(
      new FiscalTakerRules(data ?? ({} as FiscalTakerProps)),
    );
  }
}

export class FiscalTakerValidatorFactory {
  static create(): FiscalTakerValidator {
    return new FiscalTakerValidator();
  }
}
