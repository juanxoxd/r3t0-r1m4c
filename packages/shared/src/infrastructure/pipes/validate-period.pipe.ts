import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AppError, ErrorTypes } from '../../domain/error/index';

@Injectable()
export class CustomValidationPipePeriod implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    const { period } = value;

    const [startDate, endDate] = period.split('_');

    if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'Invalid date format. Use YYYY-MM-DD.',
        'ERR_INVALID_DATE_FORMAT'
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end.getTime() - start.getTime() > 30 * 24 * 60 * 60 * 1000) {
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'Date range should not exceed 30 days.',
        'ERR_DATE_RANGE_EXCEED'
      );
    }

    return value;
  }

  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}
