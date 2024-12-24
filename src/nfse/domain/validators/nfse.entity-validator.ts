import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  Matches,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceEntityRules } from './service.entity-validator';
import { AddressEntityRules } from './address.entity-validator';
import { NfseProps } from '../interfaces/nfse.interface';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';

// Reusable document validation
export class DocumentRules {
  @IsOptional()
  @Matches(/^\d{11}$/, {
    message: 'Invalid CPF format. It must have 11 digits.',
  })
  cpf?: string;

  @IsOptional()
  @Matches(/^\d{14}$/, {
    message: 'Invalid CNPJ format. It must have 14 digits.',
  })
  cnpj?: string;
}

// RPS Identification
export class RpsIdentificationRules {
  @IsString()
  @IsNotEmpty({ message: 'Number is required.' })
  number: string;

  @IsString()
  @IsNotEmpty({ message: 'Series is required.' })
  series: string;

  @IsString()
  @IsNotEmpty({ message: 'Type is required.' })
  type: string;
}

// Provider Identification
export class ProviderIdentificationRules {
  @Matches(/^\d{14}$/, {
    message: 'Invalid CNPJ format. It must have 14 digits.',
  })
  cnpj: string;

  @IsString()
  @IsNotEmpty({ message: 'Municipal Registration is required.' })
  municipalRegistration: string;
}

// Provider Service
export class ProviderServiceRules {
  @ValidateNested()
  @Type(() => ProviderIdentificationRules)
  providerIdentification: ProviderIdentificationRules;

  @IsString()
  @IsNotEmpty({ message: 'Trade Name is required.' })
  tradeName: string;

  @ValidateNested()
  @Type(() => AddressEntityRules)
  address: AddressEntityRules;
}

// Nfse Contact
export class NfseContactRules {
  @IsOptional()
  @Matches(/^\d{10,15}$/, { message: 'Invalid phone number format.' })
  phone?: string;

  @IsOptional()
  @Matches(/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format.',
  })
  email?: string;
}

// Service Taker Address
export class ServiceTakerAddressRules {
  @IsPositive({ message: 'Municipality Code must be positive.' })
  municipalityCode: number;

  @Matches(/^\d{8}$/, {
    message: 'Invalid ZIP code format. It must have 8 digits.',
  })
  zipCode: string;
}

// Service Taker Identification
export class ServiceTakerIdentificationRules {
  @ValidateNested()
  @Type(() => DocumentRules)
  cpfCnpj: DocumentRules;
}

// Service Taker
export class ServiceTakerRules {
  @ValidateNested()
  @Type(() => ServiceTakerIdentificationRules)
  serviceTakerIdentification: ServiceTakerIdentificationRules;

  @IsString()
  @IsNotEmpty({ message: 'Business Name is required.' })
  businessName: string;

  @ValidateNested()
  @Type(() => AddressEntityRules)
  address: AddressEntityRules;

  @ValidateNested()
  @Type(() => NfseContactRules)
  @IsOptional()
  contact?: NfseContactRules;
}

// Nfse Rules
export class NfseRules {
  @IsString()
  @IsNotEmpty({ message: 'Number is required.' })
  number: string;

  @IsString()
  @IsNotEmpty({ message: 'Verification Code is required.' })
  verificationCode: string;

  @IsString()
  @IsNotEmpty({ message: 'Issue Date is required.' })
  issueDate: string;

  @ValidateNested()
  @Type(() => RpsIdentificationRules)
  rpsIdentification: RpsIdentificationRules;

  @IsString()
  @IsNotEmpty({ message: 'RPS Issue Date is required.' })
  rpsIssueDate: string;

  @IsString()
  @IsNotEmpty({ message: 'Operation Nature is required.' })
  operationNature: string;

  @IsString()
  @IsNotEmpty({ message: 'Special Tax Regime is required.' })
  specialTaxRegime: string;

  @IsString()
  @IsNotEmpty({ message: 'Simple National Option is required.' })
  simpleNationalOption: string;

  @IsString()
  @IsNotEmpty({ message: 'Cultural Incentive is required.' })
  culturalIncentive: string;

  @IsString()
  @IsNotEmpty({ message: 'Competence is required.' })
  competence: string;

  @IsOptional()
  @IsString({ message: 'Replaced Nfse must be a string.' })
  replacedNfse?: string;

  @ValidateNested()
  @Type(() => ServiceEntityRules)
  service: ServiceEntityRules;

  @IsNumber()
  @Min(0, { message: 'Credit Value must be greater than or equal to 0.' })
  creditValue: number;

  @ValidateNested()
  @Type(() => ProviderServiceRules)
  serviceProvider: ProviderServiceRules;

  @ValidateNested()
  @Type(() => ServiceTakerRules)
  serviceRecipient: ServiceTakerRules;

  constructor(props: NfseProps) {
    Object.assign(this, props);
  }
}

export class NfseEntityValidator extends ClassValidatorFields<NfseRules> {
  validate(data: NfseProps): boolean {
    return super.validate(data);
  }
}

export class NfseEntityValidatorFactory {
  static create(): NfseEntityValidator {
    return new NfseEntityValidator();
  }
}
