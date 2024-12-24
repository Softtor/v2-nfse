import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { BatchRpsProps } from '../entities/batch-rps.entity';
import { ProviderProps } from '../entities/provider.entity';
import { RpsProps } from '../entities/rps.entity';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsArray,
  IsOptional,
} from 'class-validator';
export class BatchRpsEntityRules implements BatchRpsProps {
  @IsNotEmpty({ message: 'Número do lote é obrigatório' })
  @IsString({ message: 'Número do lote deve ser uma string' })
  @MaxLength(15, { message: 'Número do lote deve ter no máximo 15 caracteres' })
  batchNumber: string;

  @IsNotEmpty({ message: 'Provedor é obrigatório' })
  provider: ProviderProps;

  @IsInt({ message: 'Quantidade de RPS deve ser um número inteiro' })
  @Min(0, { message: 'Quantidade de RPS deve ser pelo menos 1' })
  @Max(9999, { message: 'Quantidade de RPS deve ser no máximo 9999' })
  @IsOptional()
  rpsQuantity: number;

  @IsArray({ message: 'Lista de RPS deve ser um array' })
  @IsOptional()
  rpsList: RpsProps[];

  constructor(props: BatchRpsProps) {
    Object.assign(this, props);
  }
}

export class BatchRpsEntityValidator extends ClassValidatorFields<BatchRpsEntityRules> {
  validate(data: BatchRpsProps): boolean {
    return super.validate(
      new BatchRpsEntityRules(data ?? ({} as BatchRpsProps)),
    );
  }
}

export class BatchRpsEntityValidatorFactory {
  static create(): BatchRpsEntityValidator {
    return new BatchRpsEntityValidator();
  }
}
