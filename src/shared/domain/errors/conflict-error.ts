import { HttpStatus } from '@nestjs/common';

export class ConflictError extends Error {
  public readonly statusCode: number;

  constructor(public message: string) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = HttpStatus.CONFLICT;
  }
}
