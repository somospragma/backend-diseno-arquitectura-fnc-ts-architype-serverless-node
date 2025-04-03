import { UserService } from '@userManagement/domain/services/UserService';

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
  async execute(userId: number): Promise<any> {
    return this.userService.deleteUser(userId);
  }
}
