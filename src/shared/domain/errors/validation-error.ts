import { HttpStatus } from '@nestjs/common';
import { FieldsErrors } from '../validators/validator-fields.interface';

export class ValidationError extends Error {
  public readonly statusCode: number;

  constructor(public message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

export class EntityValidationError extends Error {
  public readonly statusCode: number;

  constructor(public error: FieldsErrors) {
    super('Entity Validation Error');
    this.name = 'EntityValidationError';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}
