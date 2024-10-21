import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AppError, ErrorTypes } from '../../domain/error/index';

@Injectable()
export class CustomValidationPipeDate implements PipeTransform<string> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<string> {
    const { date } = value;

    if (!this.isValidDate(date)) {
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'Invalid date format. Use YYYY-MM-DD.',
        'ERR_INVALID_DATE_FORMAT'
      );
    }
    return value;
  }

  private isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);

    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() + 1 !== month ||
      date.getUTCDate() !== day
    ) {
      return false;
    }

    return true;
  }
}
