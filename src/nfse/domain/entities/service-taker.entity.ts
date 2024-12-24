import { Entity } from './entity';
import { ServiceTakerEntityValidatorFactory } from '../validators/service-taker.entity-validator';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';
import { AddressProps } from './address.entity';

export type ServiceTakerProps = {
  cnpj?: string;
  cpf?: string;
  businessName: string;
  address?: AddressProps;
  phone?: string;
  email?: string;
};

export class ServiceTakerEntity extends Entity<ServiceTakerProps> {
  constructor(props: ServiceTakerProps) {
    super(props);
    this.validate();
  }

  validate(): void {
    const validator = ServiceTakerEntityValidatorFactory.create();
    const isValid = validator.validate(this.props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get cnpj(): string | undefined {
    return this.props.cnpj;
  }

  set cnpj(value: string | undefined) {
    this.props.cnpj = value;
  }

  get cpf(): string | undefined {
    return this.props.cpf;
  }

  set cpf(value: string | undefined) {
    this.props.cpf = value;
  }

  get businessName(): string {
    return this.props.businessName;
  }

  set businessName(value: string) {
    this.props.businessName = value;
  }

  get address(): AddressProps {
    return this.props.address;
  }

  set address(value: AddressProps) {
    this.props.address = value;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  set phone(value: string | undefined) {
    this.props.phone = value;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  set email(value: string | undefined) {
    this.props.email = value;
  }
}
