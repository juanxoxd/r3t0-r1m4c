import { IsInt } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class SwapiDto {
  @ApiProperty({
    description: 'id',
    example: 1
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'El ID debe ser un número entero válido' })
  id: number
}
