import { UserService } from '@userManagement/domain/services/UserService';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';

export class DeleteUserUseCase {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * Ejecuta el caso de uso para eliminar un usuario por su ID.
   * @param userId ID del usuario a eliminar.
   * @returns Respuesta estandarizada confirmando la eliminación.
   */
  async execute(userId: number): Promise<ApiResponse<any>> {
    await this.userService.deleteUser(userId);
    return new ApiResponse(null, 'User deleted successfully', 204);
  }
}
