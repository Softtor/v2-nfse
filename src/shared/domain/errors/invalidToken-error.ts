import { HttpStatus } from '@nestjs/common';

export class InvalidTokenError extends Error {
  public readonly statusCode: number;

  constructor(public message: string) {
    super(message);
    this.name = 'InvalidTokenError';
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
