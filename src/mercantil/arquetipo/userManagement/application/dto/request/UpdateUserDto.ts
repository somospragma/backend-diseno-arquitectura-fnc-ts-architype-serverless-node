import { IsString, IsOptional, Length, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres.' })
  firstName!: string;

  @IsString()
  @IsOptional()
  @Length(1, 100, { message: 'El apellido debe tener entre 1 y 100 caracteres.' })
  lastName!: string;

  @IsString()
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.' })
  bithDate!: string;
}
