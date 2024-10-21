import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AppError, ErrorTypes} from '../../domain/error/index';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const messages = errors.map((error) => {
        const constraints = error.constraints ? Object.values(error.constraints).join(', ') : 'No constraints';
        return `${error.property} has wrong value ${error.value}, ${constraints}`;
      });
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        messages.join('; '),
        'ERR_VALIDATION_FAILED'
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
