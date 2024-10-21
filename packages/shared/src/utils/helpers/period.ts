import { AppError, ErrorTypes } from './../../domain/error/index';

export function getPeriodDates(period: string, maxLimit: number, withHours = false) {
  const date = period.split('_');
  const startDate = withHours ? date[0] + 'T00:00:00.000Z' : date[0];
  const endDate = withHours ? date[1] + 'T23:59:59.999Z' : date[1];

  const validation = validateDatePeriod(startDate, endDate, maxLimit);
  if (!validation) {
    throw new AppError(ErrorTypes.BAD_REQUEST, 'Invalid period', 'ERR_INVALID_PERIOD');
  }

  return {
    startDate,
    endDate,
  };
}

function validateDatePeriod(startDate: string, endDate: string, maxLimit: number) {
  const date1 = new Date(startDate).getTime();
  const date2 = new Date(endDate).getTime();
  if (date1 > date2) {
    return false;
  }

  const difference = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
  return !isNaN(difference) && difference >= 0 && difference <= maxLimit;
}

export function getDifferenceMonths(date1: string | Date, date2: string | Date): number {
  const startDate = new Date(date1),
    endDate = new Date(date2);

  return Math.abs(
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth())
  );
}
