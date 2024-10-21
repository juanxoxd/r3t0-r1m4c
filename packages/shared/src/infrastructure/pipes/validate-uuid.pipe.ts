import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AppError, ErrorTypes } from '../../domain/error/index';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  async transform(value: any): Promise<any> {
    if (!isUUID(value, '4')) {
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'Invalid UUID format. Must be a valid UUID v4.',
        'ERR_INVALID_UUID_FORMAT'
      );
    }
    return value;
  }
}
