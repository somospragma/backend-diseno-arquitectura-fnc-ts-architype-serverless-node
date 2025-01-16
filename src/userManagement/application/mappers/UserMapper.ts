import { User } from '@userManagement/domain/models/User';
import { UserDtoResponse } from '@userManagement/application/dto/response/UserDtoResponse';

export class UserMapper {
  
  /**
   *
   *
   * @static
   * @param {User} user
   * @return {*}  {UserDtoResponse}
   * @memberof UserMapper
   */
  static toDto(user: User): UserDtoResponse {
    return new UserDtoResponse(user.id, `${user.firstName} ${user.lastName}`);
  }

  
  /**
   *
   *
   * @static
   * @param {UserDtoResponse} UserDtoResponse
   * @return {*}  {User}
   * @memberof UserMapper
   */
  static toEntity(userDto: UserDtoResponse): User {
    const [firstName, lastName] = userDto.fullName.split(' ');
    return new User(userDto.id, firstName, lastName);
  }
}
