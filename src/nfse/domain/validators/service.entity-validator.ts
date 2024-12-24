import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ServiceProps } from '../entities/service.entity';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';

export class ServiceEntityRules {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  serviceValue: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  deductionValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pisValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cofinsValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inssValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  irValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  csllValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  otherRetentions?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalTributesValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  issValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rate?: number;

  @IsOptional()
  @IsString()
  nbsCode?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  unconditionalDiscount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  conditionalDiscount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  issWithheld: number;

  @IsNotEmpty()
  @IsString()
  serviceItemList: string;

  @IsNotEmpty()
  @IsString()
  cnaeCode: string;

  @IsNotEmpty()
  @IsString()
  municipalTaxationCode: string;

  @IsNotEmpty()
  @IsString()
  serviceDescription: string;

  @IsNotEmpty()
  @IsString()
  municipalityCode: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  issExigibility: number;

  @IsNotEmpty()
  @IsString()
  incidenceMunicipality: string;

  constructor(props: ServiceProps) {
    Object.assign(this, props);
  }
}

export class ServiceEntityValidator extends ClassValidatorFields<ServiceEntityRules> {
  validate(data: ServiceProps): boolean {
    return super.validate(new ServiceEntityRules(data ?? ({} as ServiceProps)));
  }
}

export class ServiceEntityValidatorFactory {
  static create(): ServiceEntityValidator {
    return new ServiceEntityValidator();
  }
}
