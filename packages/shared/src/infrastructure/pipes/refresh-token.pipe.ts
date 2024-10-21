import { PipeTransform, Injectable } from '@nestjs/common';
import { AppError, ErrorTypes } from '../../domain/error/index';

@Injectable()
export class ValidateRefreshTokenPipe implements PipeTransform {
  transform(value: any) {
    if (!value || !value.refresh_token) {
      throw new AppError(ErrorTypes.BAD_REQUEST, 'REFRESH TOKEN NOT VALID', 'ERR_NO_REFRESH_TOKEN');
    }

    if (typeof value.refresh_token !== 'string' || value.refresh_token.trim() === '') {
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'REFRESH TOKEN NOT VALID',
        'ERR_INVALID_REFRESH_TOKEN'
      );
    }

    return value;
  }
}
