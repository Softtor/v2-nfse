import { HttpStatus } from '@nestjs/common';

export class BadRequestError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}
