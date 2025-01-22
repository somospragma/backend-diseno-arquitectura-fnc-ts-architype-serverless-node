import { Constants } from '@crosscutting/utils/Constants';
import { IsString, IsOptional, Length, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(1, 100, { message: Constants.VALIDATION_USERNAME_LENGTH })
  firstName!: string;

  @IsString()
  @IsOptional()
  @Length(1, 100, { message: Constants.VALIDATION_LASTNAME_LENGTH })
  lastName!: string;

  @IsString()
  @IsOptional()
  @IsDateString({}, { message: Constants.VALIDATION_BIRTHDATE_FORMAT })
  bithDate!: string;
}
