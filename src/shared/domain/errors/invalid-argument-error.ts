import { HttpStatus } from '@nestjs/common';

export class InvalidArgumentError extends Error {
  public readonly statusCode: number;

  constructor(public message: string) {
    super(message);
    this.name = 'InvalidArgumentError';
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
