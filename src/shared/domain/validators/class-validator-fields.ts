import { validateSync } from 'class-validator';
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null;
  validatedData: PropsValidated = null;

  validate(data: any): boolean {
    const errors = validateSync(data);
    this.errors = errors.length ? {} : null;
    this.validatedData = errors.length ? null : data;

    errors.forEach((error) => {
      const field = error.property;
      this.errors[field] = Object.values(error.constraints);
    });

    return !errors.length;
  }
}
