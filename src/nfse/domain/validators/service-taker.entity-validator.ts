import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  ValidateIf,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidateNested,
} from 'class-validator';
import { isCNPJ, isCPF } from 'validation-br';
import { ServiceTakerProps } from '../entities/service-taker.entity';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { AddressProps } from '../entities/address.entity';

// Validador Customizado para CPF
@ValidatorConstraint({ name: 'IsCpf', async: false })
class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    if (!cpf) return false;
    return isCPF(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF inválido.';
  }
}

@ValidatorConstraint({ name: 'IsCnpj', async: false })
class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(cnpj: string, args: ValidationArguments) {
    if (!cnpj) return false;
    return isCNPJ(cnpj);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CNPJ inválido.';
  }
}

// Validador Customizado para garantir que apenas CPF ou CNPJ sejam fornecidos
@ValidatorConstraint({ name: 'CpfCnpjExclusive', async: false })
class CpfCnpjExclusiveConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as ServiceTakerProps;
    const hasCpf = !!object.cpf;
    const hasCnpj = !!object.cnpj;
    return (hasCpf && !hasCnpj) || (!hasCpf && hasCnpj);
  }

  defaultMessage(): string {
    return 'Deve ser fornecido apenas CPF ou CNPJ, não ambos.';
  }
}

export class ServiceTakerEntityRules {
  @IsOptional()
  @IsString({ message: 'CNPJ deve ser uma string.' })
  @ValidateIf((o) => !o.cpf)
  @Validate(IsCnpjConstraint)
  cnpj?: string;

  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string.' })
  @ValidateIf((o) => !o.cnpj)
  @Validate(IsCpfConstraint)
  cpf?: string;

  @Validate(CpfCnpjExclusiveConstraint)
  cpfCnpjExclusive?: boolean;

  @IsNotEmpty({ message: 'Nome Empresarial é obrigatório.' })
  @IsString({ message: 'Nome Empresarial deve ser uma string.' })
  businessName: string;

  @IsOptional()
  address?: AddressProps; // Assegure-se de ter um validator para AddressProps

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string.' })
  phone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail deve ser válido.' })
  email?: string;

  constructor(props: ServiceTakerProps) {
    Object.assign(this, props);
  }
}

export class ServiceTakerEntityValidator extends ClassValidatorFields<ServiceTakerEntityRules> {
  validate(data: ServiceTakerProps): boolean {
    return super.validate(
      new ServiceTakerEntityRules(data ?? ({} as ServiceTakerProps)),
    );
  }
}

export class ServiceTakerEntityValidatorFactory {
  static create(): ServiceTakerEntityValidator {
    return new ServiceTakerEntityValidator();
  }
}
