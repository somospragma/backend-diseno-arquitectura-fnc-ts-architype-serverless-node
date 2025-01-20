import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';
import { User } from '@userManagement/domain/models/User';
import { UserRepositoryPort } from '@userManagement/domain/ports/in/UserRepositoryPort';
import { ParameterRepositoryPort } from '@userManagement/domain/ports/out/ParameterRepositoryPort';

export class UserService {
  private userRepository: UserRepositoryPort;
  private parameterRestClient: ParameterRepositoryPort;

  constructor(userRepository: UserRepositoryPort, parameterRestClient: ParameterRepositoryPort) {
    this.userRepository = userRepository;
    this.parameterRestClient = parameterRestClient
  }


  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ErrorResponse('User not found', 404);
    }
    return user;
  }


  async findAll({ offset, limit }: { offset: number; limit: number }): Promise<User[]> {
    return this.userRepository.findAll(offset, limit);
  }

  async count(): Promise<number> {
    return this.userRepository.count();
  }


  async createUser(user: User): Promise<User> {    
    await this.validate_age(user.birthDate)
    return await this.userRepository.create(user);
  }

  private async validate_age(birthDate: string){
    const minAge = await this.parameterRestClient.getParameter('min_age');
    const maxAge = await this.parameterRestClient.getParameter('max_age');
    console.log(birthDate);
    
    console.log(minAge,maxAge);
  }


  async updateUser(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
