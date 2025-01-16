import { UserService } from '@userManagement/domain/services/UserService';
import { UserMapper } from '@userManagement/application/mappers/UserMapper';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { User } from '@userManagement/domain/models/User';
import { CreateUserDto } from '@userManagement/application/dto/request/CreateUserDto';

export class CreateUserUseCase {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

 
  async execute(userDto: CreateUserDto): Promise<ApiResponse<any>> {
    const user = new User(0, userDto.firstName, userDto.lastName); 
    const createdUser = await this.userService.createUser(user);
    const createdUserDto = UserMapper.toDto(createdUser);
    return new ApiResponse(createdUserDto, 'User created successfully', 201);
  }
}
