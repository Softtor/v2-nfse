import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvalidArgumentError } from './invalid-argument-error';
import { FastifyReply } from 'fastify';
import { NotFoundError } from './not-found-error';
import { ConflictError } from './conflict-error';
import { BadRequestError } from './bad-request-error';
import { InvalidCredentialsError } from './invalid-credentials-error';
import { InvalidPasswordError } from './invalid-password-error';
import { InvalidTokenError } from './invalidToken-error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly exceptionStatusMap = new Map<
    new (...args: any[]) => Error,
    number
  >([
    [NotFoundError, HttpStatus.NOT_FOUND],
    [ConflictError, HttpStatus.CONFLICT],
    [BadRequestError, HttpStatus.BAD_REQUEST],
    [InvalidCredentialsError, HttpStatus.UNAUTHORIZED],
    [InvalidPasswordError, HttpStatus.UNAUTHORIZED],
    [InvalidTokenError, HttpStatus.UNAUTHORIZED],
    [InvalidArgumentError, HttpStatus.UNPROCESSABLE_ENTITY],
  ]);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno no servidor';

    if (exception instanceof Error) {
      const exceptionType = exception.constructor as new (
        ...args: any[]
      ) => Error;

      if (this.exceptionStatusMap.has(exceptionType)) {
        status = this.exceptionStatusMap.get(exceptionType);
        message = exception.message;
      }

      if (exception instanceof HttpException) {
        status = exception.getStatus();
        message =
          (exception.getResponse() as any)?.message || exception.message;
      }

      console.error(exception);
    }

    return response.status(status).send({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
