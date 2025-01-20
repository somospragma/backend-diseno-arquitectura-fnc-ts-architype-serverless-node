import { IsString, IsOptional, Length, Matches } from 'class-validator';

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
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.',
  })
  bithDate!: string;
}
