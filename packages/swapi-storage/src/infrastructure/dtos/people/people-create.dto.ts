import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsNumberString
} from 'class-validator'
import { Transform } from 'class-transformer';

export class CreatePeopleDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  height?: string

  @IsOptional()
  @IsString()
  mass?: string

  @IsOptional()
  @IsString()
  hair_color?: string

  @IsOptional()
  @IsString()
  skin_color?: string

  @IsOptional()
  @IsString()
  eye_color?: string

  @IsOptional()
  @IsString()
  birth_year?: string

  @IsOptional()
  @IsString()
  gender?: string

  @IsOptional()
  @IsString()
  homeworld_url?: string

  @IsNotEmpty({ message: 'El campo document es obligatorio' })
  @IsNumberString({}, { message: 'El campo document debe ser un número válido' })
  @Length(8, 10, { message: 'El campo document debe tener entre 8 y 10 dígitos' })
  @Transform(({ value }) => value.toString())
  document: string;
}