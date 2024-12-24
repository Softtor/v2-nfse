import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';
import { AddressProps } from '../entities/address.entity';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';

export class AddressEntityRules {
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty({ message: 'Number is required' })
  @IsString({ message: 'Number must be a string' })
  number: string;

  @IsOptional()
  @IsString({ message: 'Complement must be a string' })
  complement?: string;

  @IsNotEmpty({ message: 'Neighborhood is required' })
  @IsString({ message: 'Neighborhood must be a string' })
  neighborhood: string;

  @IsNotEmpty({ message: 'Municipality Code is required' })
  @IsString({ message: 'Municipality Code must be a string' })
  @MaxLength(7, {
    message: 'Municipality Code must have at most 7 characters',
  })
  municipalityCode: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State must be a string' })
  @Matches(/^[A-Z]{2}$/, { message: 'State must contain 2 uppercase letters' })
  state: string;

  @IsNotEmpty({ message: 'Postal Code is required' })
  @IsString({ message: 'Postal Code must be a string' })
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'Postal Code must be in the format 00000-000',
  })
  postalCode: string;

  constructor(props: AddressProps) {
    Object.assign(this, props);
  }
}

export class AddressEntityValidator extends ClassValidatorFields<AddressEntityRules> {
  validate(data: AddressProps): boolean {
    return super.validate(new AddressEntityRules(data ?? ({} as AddressProps)));
  }
}

export class AddressEntityValidatorFactory {
  static create(): AddressEntityValidator {
    return new AddressEntityValidator();
  }
}
