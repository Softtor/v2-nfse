import { HttpStatus } from '@nestjs/common';

export class SoapRequestError extends Error {
  public readonly statusCode: number;

  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = 'SoapRequestError';
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export class SoapValidationError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'SoapValidationError';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

export class SoapAuthenticationError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'SoapAuthenticationError';
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}

export class SoapErrorHandler {
  public handleError(err: Error): never {
    if (err.message.includes('validation')) {
      throw new SoapValidationError(err.message);
    } else if (err.message.includes('authentication')) {
      throw new SoapAuthenticationError(err.message);
    } else {
      throw new SoapRequestError(err.message, err);
    }
  }
}
