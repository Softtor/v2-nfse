import { Entity } from './entity';
import { ProviderEntityValidatorFactory } from '../validators/provider.entity-validator';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';

export type ProviderProps = {
  municipalSubscription: string;
  cnpj?: string;
  cpf?: string;
};

export class ProviderEntity extends Entity<ProviderProps> {
  constructor({ cnpj, cpf, municipalSubscription }: ProviderProps) {
    super({ cnpj, cpf, municipalSubscription });
  }

  static validate(props: ProviderProps) {
    const validator = ProviderEntityValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get cpf() {
    return this.props.cpf;
  }

  get municipalSubscription() {
    return this.props.municipalSubscription;
  }

  get isCompany() {
    return !!this.props.cnpj;
  }

  get isPerson() {
    return !!this.props.cpf;
  }

  // setters
  set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  set municipalSubscription(municipalSubscription: string) {
    this.props.municipalSubscription = municipalSubscription;
  }
}
