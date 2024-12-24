import { HttpStatus } from '@nestjs/common';

export class InvalidCredentialsError extends Error {
  public readonly statusCode: number;

  constructor(public message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
