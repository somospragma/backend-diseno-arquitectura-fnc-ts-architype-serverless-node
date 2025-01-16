import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';
import { User } from '@userManagement/domain/models/User';
import { UserRepositoryPort } from '@userManagement/domain/ports/UserRepositoryPort';

export class UserService {
  private userRepository: UserRepositoryPort;

  /**
   * Creates an instance of UserService.
   * @param {UserRepositoryPort} userRepository
   * @memberof UserService
   */
  constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

 
  /**
   *
   *
   * @param {number} userId
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ErrorResponse('User not found', 404);
    }
    return user;
  }

 
  /**
   *
   *
   * @return {*}  {Promise<User[]>}
   * @memberof UserService
   */
  async findAll({ offset, limit }: { offset: number; limit: number }): Promise<User[]> {
    return this.userRepository.findAll(offset, limit);
  }

  /**
   *
   *
   * @return {*}  {Promise<number>}
   * @memberof UserService
   */
  async count(): Promise<number> {
    return this.userRepository.count();
  }

 
  /**
   *
   *
   * @param {User} user
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async createUser(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

 
  /**
   *
   *
   * @param {User} user
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async updateUser(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

 
  /**
   *
   *
   * @param {number} userId
   * @return {*}  {Promise<void>}
   * @memberof UserService
   */
  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
