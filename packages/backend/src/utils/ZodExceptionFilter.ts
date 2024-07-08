import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class ZodExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    if (!this.isZodError(exception)) {
      return super.catch(exception, host);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      type: 'validation',
      path: exception.issues.map((issue) => issue.path),
      message:
        exception.issues.map((issue) => issue.message) ?? 'Unknown error ',
    });
  }

  private isZodError = (err: Error): err is ZodError => {
    return err.name === 'ZodError';
  };
}
