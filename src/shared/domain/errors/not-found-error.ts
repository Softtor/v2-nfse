import { HttpStatus } from '@nestjs/common';

export class NotFoundError extends Error {
  public readonly statusCode: number;

  constructor(public message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
