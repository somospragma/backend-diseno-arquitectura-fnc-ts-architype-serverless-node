import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres.' })
  firstName!: string;

  @IsString()
  @IsOptional()
  @Length(1, 100, { message: 'El apellido debe tener entre 1 y 100 caracteres.' })
  lastName!: string;
}
