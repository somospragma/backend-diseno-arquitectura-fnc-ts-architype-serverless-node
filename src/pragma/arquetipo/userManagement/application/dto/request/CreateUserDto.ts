import { Constants } from '@crosscutting/utils/Constants';
import { IsString, IsNotEmpty, Length, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: Constants.VALIDATION_USERNAME })
  @Length(1, 100, { message: Constants.VALIDATION_USERNAME_LENGTH })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: Constants.VALIDATION_LASTNAME })
  @Length(1, 100, { message: Constants.VALIDATION_LASTNAME_LENGTH })
  lastName!: string;

  @IsString()
  @IsNotEmpty({ message: Constants.VALIDATION_BIRTHDATE })
  @IsDateString({}, { message: Constants.VALIDATION_BIRTHDATE_FORMAT })
  birthDate!: string;
}
