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
    return await this.userRepository.create(user);
  }
  
  //función realizada para validar el comportamiento REST
  private async validate_age(birthDate: string): Promise<void> {
    const minAgeResponse = await this.parameterRestClient.getParameter('min_age');
    const maxAgeResponse = await this.parameterRestClient.getParameter('max_age');

    const minAge = parseInt(minAgeResponse.data.value)
    const maxAge = parseInt(maxAgeResponse.data.value)

    const birthDateObject = new Date(birthDate);
    const today = new Date();
  
    let age = today.getFullYear() - birthDateObject.getFullYear();
    const isBeforeBirthdayThisYear =
      today.getMonth() < birthDateObject.getMonth() ||
      (today.getMonth() === birthDateObject.getMonth() && today.getDate() < birthDateObject.getDate());
  
    if (isBeforeBirthdayThisYear) {
      age--;
    }

    if (age < minAge) {
      throw new ErrorResponse(`La edad mínima permitida es ${minAge} años. La edad calculada es ${age} años.`, 404);
    }
  
    if (age > maxAge) {
      throw new ErrorResponse(`La edad máxima permitida es ${maxAge} años. La edad calculada es ${age} años.`, 404);
    }
  }
  


  async updateUser(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
