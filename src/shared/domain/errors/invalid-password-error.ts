import { HttpStatus } from '@nestjs/common';

export class InvalidPasswordError extends Error {
  public readonly statusCode: number;

  constructor(public message: string) {
    super(message);
    this.name = 'InvalidPasswordError';
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
