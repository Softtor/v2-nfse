import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FiscalNfConfigProps } from '../entities/fiscal-nf-config.entity';

export class FiscalNfConfigRules {
  @IsString()
  @IsNotEmpty()
  serie: string;

  @IsNumber()
  @IsNotEmpty()
  nextDocumentNumber: number;

  @IsBoolean()
  @IsOptional()
  simpleNational?: boolean;

  @IsString()
  @IsNotEmpty()
  @IsIn(['1', '2', '3', '4', '5', '6'], {
    message:
      'Taxation regime must be one of the following values: 1, 2, 3, 4, 5, 6.',
  })
  taxationRegime: string;

  @IsString()
  @IsOptional()
  @IsIn(['1', '2'], {
    message: 'Operation nature must be one of the following values: 1, 2.',
  })
  operationNature?: string;

  @IsNumber()
  @IsNotEmpty()
  emitterId: number;

  @IsBoolean()
  @IsOptional()
  culturalIncentive?: boolean;

  @IsBoolean()
  @IsOptional()
  fiscalIncentive?: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor(props: FiscalNfConfigRules) {
    Object.assign(this, props);
  }
}

export class FiscalNfConfigValidator extends ClassValidatorFields<FiscalNfConfigRules> {
  validate(data: FiscalNfConfigRules): boolean {
    return super.validate(
      new FiscalNfConfigRules(data ?? ({} as FiscalNfConfigProps)),
    );
  }
}

export class FiscalNfConfigValidatorFactory {
  static create(): FiscalNfConfigValidator {
    return new FiscalNfConfigValidator();
  }
}
