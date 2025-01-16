import { UserService } from '@userManagement/domain/services/UserService';
import { UserMapper } from '@userManagement/application/mappers/UserMapper';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';

export class GetUserUseCase {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * Ejecuta el caso de uso para obtener un usuario por su ID.
   * @param userId ID del usuario.
   * @returns Respuesta estandarizada con el usuario encontrado.
   */
  async execute(userId: number): Promise<ApiResponse<any>> {
    const user = await this.userService.getUserById(userId);
    const userDto = UserMapper.toDto(user);
    return new ApiResponse(userDto, 'User retrieved successfully');
  }
}
