import { Repository } from 'typeorm';
import { User } from '@userManagement/domain/models/User';
import { UserRepositoryPort } from '@userManagement/domain/ports/in/UserRepositoryPort';
import { AppDataSource } from '@crosscutting/configuration/AppConfig';
import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';

export class UserDataProvider implements UserRepositoryPort {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * Retorna el número total de usuarios.
   */
  async count(): Promise<number> {
    return await this.userRepository.count();
  }

  /**
   * Busca un usuario por ID.
   * @param userId ID del usuario
   */
  async findById(userId: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  /**
   * Obtiene una lista de usuarios con paginación.
   * @param offset Desplazamiento (número de registros a saltar)
   * @param limit Límite de registros a retornar
   */
  async findAll(offset: number, limit: number): Promise<User[]> {
    return await this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  /**
   * Crea un nuevo usuario.
   * @param user Objeto usuario
   */
  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  /**
   * Actualiza un usuario existente.
   * @param user Objeto usuario con datos actualizados
   */
  async update(user: User): Promise<User> {
    const existingUser = await this.findById(user.id);
    if (!existingUser) {
      throw new ErrorResponse('Usuario no encontrado', 404);
    }
    return await this.userRepository.save({ ...existingUser, ...user });
  }

  /**
   * Elimina un usuario por su ID.
   * @param userId ID del usuario a eliminar
   */
  async delete(userId: number): Promise<void> {
    const existingUser = await this.findById(userId);
    if (!existingUser) {
      throw new ErrorResponse('Usuario no encontrado', 404);
    }
    await this.userRepository.delete(userId);
  }
}
