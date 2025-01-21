import { UserService } from '@userManagement/domain/services/UserService';
import { User } from '@userManagement/domain/models/User';

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
  async execute(userId: number): Promise<User> {
    return await this.userService.getUserById(userId);
  }
}
