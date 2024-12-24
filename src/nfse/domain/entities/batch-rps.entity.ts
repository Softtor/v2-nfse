import { Entity } from './entity';
import { ProviderProps } from './provider.entity';
import { RpsProps } from './rps.entity';
import { BatchRpsEntityValidatorFactory } from '../validators/batch-rpc.entity-validator';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';

export type BatchRpsProps = {
  batchNumber: string;
  provider: ProviderProps;
  rpsQuantity?: number;
  rpsList?: RpsProps[];
};

export class BatchRpsEntity extends Entity<BatchRpsProps> {
  constructor(props: BatchRpsProps) {
    super(props);
    this.rpsQuantity = props.rpsList.length;
    this.validate({ ...props, rpsQuantity: this.rpsQuantity });
  }

  validate(props: BatchRpsProps) {
    const validator = BatchRpsEntityValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  addRps(rps: RpsProps): void {
    this.props.rpsList.push(rps);
    this.rpsQuantity++;
  }

  removeRps(rps: RpsProps): void {
    this.props.rpsList = this.props.rpsList.filter((r) => r !== rps);
    this.rpsQuantity--;
  }

  get batchNumber(): string {
    return this.props.batchNumber;
  }

  set batchNumber(value: string) {
    this.props.batchNumber = value;
  }

  get provider(): ProviderProps {
    return this.props.provider;
  }

  set provider(value: ProviderProps) {
    this.props.provider = value;
  }

  get rpsQuantity(): number {
    return this.props.rpsQuantity;
  }

  set rpsQuantity(value: number) {
    this.props.rpsQuantity = value;
  }

  get rpsList(): RpsProps[] {
    return this.props.rpsList;
  }

  set rpsList(value: RpsProps[]) {
    this.props.rpsList = value;
  }
}
