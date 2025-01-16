import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres.' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @Length(1, 100, { message: 'El apellido debe tener entre 1 y 100 caracteres.' })
  lastName!: string;
}
