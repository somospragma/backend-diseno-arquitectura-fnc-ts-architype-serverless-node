import { UserService } from '@userManagement/domain/services/UserService';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { User } from '@userManagement/domain/models/User';
import { UpdateUserDto } from '@userManagement/application/dto/request/UpdateUserDto';

export class UpdateUserUseCase {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   *
   *
   * @param {number} userId
   * @param {UpdateUserDto} userDto
   * @return {*}  {Promise<ApiResponse<any>>}
   * @memberof UpdateUserUseCase
   */
  async execute(userId: number, userDto: UpdateUserDto): Promise<User> {
  
    return await this.userService.updateUser(
      new User(userId, userDto.firstName, userDto.lastName), 
    );
  }
}
