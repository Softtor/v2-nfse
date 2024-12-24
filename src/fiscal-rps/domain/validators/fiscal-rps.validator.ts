import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
  IsNumber,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FiscalRpsProps } from '../entities/fiscal-rps.entity';

export class FiscalRpsRules {
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  series: string;

  @IsDate()
  @IsOptional()
  issueDateRps?: Date;

  @IsString()
  @IsNotEmpty()
  @IsIn(['1', '2', '3'], {
    message:
      'Type must be one of the following: 1-RPS, 2-NF_CONJUGADA, 3-CUPOM.',
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['1', '2'], {
    message: 'Status must be one of the following: 1-NORMAL, 2-CANCELADO.',
  })
  status: string;

  @IsDate()
  @IsOptional()
  competence?: Date;

  @IsString()
  @IsOptional()
  complementaryInformation?: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsString()
  @IsNotEmpty()
  takerId: string;

  @IsString()
  @IsOptional()
  providerId?: string;

  @IsString()
  @IsOptional()
  batchId?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor(props: FiscalRpsRules) {
    Object.assign(this, props);
  }
}

export class FiscalRpsValidator extends ClassValidatorFields<FiscalRpsRules> {
  validate(data: FiscalRpsRules): boolean {
    return super.validate(new FiscalRpsRules(data ?? ({} as FiscalRpsProps)));
  }
}

export class FiscalRpsValidatorFactory {
  static create(): FiscalRpsValidator {
    return new FiscalRpsValidator();
  }
}
