import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FiscalBatchNfseProps } from '../entities/fiscal-bach.entity';

export class FiscalBatchNfseRules {
  @IsString()
  @IsOptional()
  name: string;

  @IsDate()
  @IsOptional()
  sentAt?: Date;

  @IsString()
  @IsOptional()
  providerId?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor(props: FiscalBatchNfseRules) {
    Object.assign(this, props);
  }
}

export class FiscalBatchNfseValidator extends ClassValidatorFields<FiscalBatchNfseRules> {
  validate(data: FiscalBatchNfseRules): boolean {
    return super.validate(
      new FiscalBatchNfseRules(data ?? ({} as FiscalBatchNfseProps)),
    );
  }
}

export class FiscalBatchNfseValidatorFactory {
  static create(): FiscalBatchNfseValidator {
    return new FiscalBatchNfseValidator();
  }
}
