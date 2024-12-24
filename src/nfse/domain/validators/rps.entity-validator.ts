import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { RpsProps, IdentificationRps } from '../entities/rps.entity';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';

export class IdentificationRpsRules {
  @IsNotEmpty({ message: 'Identification number is required' })
  @IsString({ message: 'Identification number must be a string' })
  number: string;

  @IsNotEmpty({ message: 'Identification series is required' })
  @IsString({ message: 'Identification series must be a string' })
  series: string;

  @IsNotEmpty({ message: 'Identification type is required' })
  @IsEnum(['TYPE1', 'TYPE2'], {
    message: 'Identification type must be either TYPE1 or TYPE2',
  })
  type: string;

  constructor(props: IdentificationRps) {
    Object.assign(this, props);
  }
}

// RpsEntity Rules
export class RpsEntityRules {
  @ValidateNested()
  @IsNotEmpty({ message: 'Identification is required' })
  identification: IdentificationRps;

  @IsNotEmpty({ message: 'Emission Date is required' })
  @IsDateString(
    {},
    { message: 'Emission Date must be a valid ISO date string' },
  )
  emissionDate: string;

  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @IsNotEmpty({ message: 'Service is required' })
  service: any; // Replace 'any' with ServiceEntity if needed

  @IsNotEmpty({ message: 'Provider is required' })
  provider: any; // Replace 'any' with ProviderEntity if needed

  @IsNotEmpty({ message: 'Service Taker is required' })
  serviceTaker: any; // Replace 'any' with ServiceTakerEntity if needed

  @IsNotEmpty({ message: 'Competence is required' })
  @IsDateString(
    {},
    {
      message:
        'Competence must be a valid ISO date string representing the month',
    },
  )
  competence: string;

  @IsOptional()
  specialTaxRegime?: string;

  @IsOptional()
  @IsString({ message: 'Simple National Optant must be a string' })
  simpleNationalOptant?: string;

  @IsOptional()
  @IsString({ message: 'Fiscal Incentive must be a string' })
  fiscalIncentive?: string;

  @IsOptional()
  @IsString({ message: 'Additional Information must be a string' })
  additionalInformation?: string;

  @IsOptional()
  @IsEnum(['1', '2'], {
    message: 'Cultural Incentive must be either 1 or 2',
  })
  culturalIncentive?: '1' | '2';

  @IsOptional()
  @IsString({ message: 'Nature Operation must be a string' })
  natureOperation?: string;

  constructor(props: RpsProps) {
    Object.assign(this, props);
  }
}

export class RpsEntityValidator extends ClassValidatorFields<RpsEntityRules> {
  validate(data: RpsProps): boolean {
    return super.validate(new RpsEntityRules(data ?? ({} as RpsProps)));
  }
}

export class RpsEntityValidatorFactory {
  static create(): RpsEntityValidator {
    return new RpsEntityValidator();
  }
}
