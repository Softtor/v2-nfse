import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FiscalEmitterProps } from '../entities/fiscal-emitter.entity';
import { AddressEntityRules } from '@/nfse/domain/validators/address.entity-validator';

export class FiscalEmitterRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @ValidateNested()
  @Type(() => AddressEntityRules)
  address: AddressEntityRules;

  @IsString()
  @IsOptional()
  crt?: string;

  @IsString()
  @IsOptional()
  ie?: string;

  @IsString()
  @IsNotEmpty()
  im: string;

  @IsString()
  @IsOptional()
  cnaeCode?: string;

  @IsString()
  @IsOptional()
  activityCode?: string;

  @IsNumber()
  @IsOptional()
  aliquot?: number;

  @IsNumber()
  @IsOptional()
  iss?: number;

  @IsNumber()
  @IsOptional()
  cofins?: number;

  @IsNumber()
  @IsOptional()
  csll?: number;

  @IsNumber()
  @IsOptional()
  inss?: number;

  @IsNumber()
  @IsOptional()
  ir?: number;

  @IsNumber()
  @IsOptional()
  pis?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsIn([1, 2])
  issWithheld?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsIn([0, 1])
  issEligibility?: number = 0;

  @IsString()
  @IsOptional()
  serviceItemList?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor(props: FiscalEmitterRules) {
    Object.assign(this, props);
  }
}

export class FiscalEmitterValidator extends ClassValidatorFields<FiscalEmitterRules> {
  validate(data: FiscalEmitterRules): boolean {
    return super.validate(
      new FiscalEmitterRules(data ?? ({} as FiscalEmitterProps)),
    );
  }
}

export class FiscalEmitterValidatorFactory {
  static create(): FiscalEmitterValidator {
    return new FiscalEmitterValidator();
  }
}
