import { ProviderEntityValidatorFactory } from '@/nfse/domain/validators/provider.entity-validator';
import { Entity } from '@/shared/domain/entities/entity';

import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export interface FiscalProviderProps {
  cnpj?: string;
  cpf?: string;
  municipalSubscription: string;
  emitterId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FiscalProviderEntity extends Entity<FiscalProviderProps> {
  constructor(props: FiscalProviderProps, id?: string) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
    FiscalProviderEntity.validate(this.props);
  }

  static validate(props: FiscalProviderProps): void {
    const validator = ProviderEntityValidatorFactory.create();
    const isValid = validator.validate({
      cnpj: props.cnpj,
      cpf: props.cpf,
      municipalSubscription: props.municipalSubscription,
    });
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(props: Partial<FiscalProviderProps>): void {
    const updatedProps = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
    FiscalProviderEntity.validate(updatedProps);
    const newEntity = new FiscalProviderEntity(updatedProps, this.id);
    Object.assign(this.props, newEntity.props);
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

  get emitterId(): number {
    return this.props.emitterId;
  }

  set emitterId(emitterId: string | number) {
    this.props.emitterId = Number(emitterId);
    if (isNaN(this.props.emitterId)) {
      throw new Error('Emitter ID must be a number');
    }
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
