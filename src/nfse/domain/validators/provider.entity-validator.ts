import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { ProviderProps } from '../entities/provider.entity';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';

@ValidatorConstraint({ name: 'CpfCnpjConstraint', async: false })
class CpfCnpjConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as ProviderProps;
    // Ensure that only one of cpf or cnpj is provided
    return !(object.cpf && object.cnpj);
  }

  defaultMessage(): string {
    return 'Only one of the fields cpf or cnpj must be filled';
  }
}

export class ProviderEntityRules {
  @IsOptional()
  @IsString({ message: 'CPF must be a string' })
  @ValidateIf((o) => !o.cnpj)
  cpf?: string;

  @IsOptional()
  @IsString({ message: 'CNPJ must be a string' })
  @ValidateIf((o) => !o.cpf)
  cnpj?: string;

  @IsNotEmpty({ message: 'Municipal Subscription is required' })
  @IsString({ message: 'Municipal Subscription must be a string' })
  municipalSubscription: string;

  @Validate(CpfCnpjConstraint)
  cpfCnpjConstraint?: boolean;

  constructor(props: ProviderProps) {
    Object.assign(this, props);
  }
}

export class ProviderEntityValidator extends ClassValidatorFields<ProviderEntityRules> {
  validate(data: ProviderProps): boolean {
    return super.validate(
      new ProviderEntityRules(data ?? ({} as ProviderProps)),
    );
  }
}

export class ProviderEntityValidatorFactory {
  static create(): ProviderEntityValidator {
    return new ProviderEntityValidator();
  }
}
