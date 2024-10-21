import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppError } from '../../domain/error/index';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: AppError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    // const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception.httpCode || HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      // timestamp: new Date().toISOString(),
      // path: request.url,
      STATUS_CODE: status,
      MESSAGE: exception.message,
      ERROR_CODE: exception.errorCode,
    };

    httpAdapter.reply(response, responseBody, status);
  }
}
