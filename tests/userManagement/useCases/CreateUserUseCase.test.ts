import { CreateUserUseCase } from '@userManagement/application/useCases/CreateUserUseCase';
import { UserService } from '@userManagement/domain/services/UserService';
import { User } from '@userManagement/domain/models/User';
import { CreateUserDto } from '@userManagement/application/dto/request/CreateUserDto';
import { plainToInstance } from 'class-transformer';

describe('CreateUserUseCase', () => {
  let userService: jest.Mocked<UserService>;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userService = {
      createUser: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    createUserUseCase = new CreateUserUseCase(userService);
  });

  it('debería crear un usuario correctamente', async () => {

    let body = {
      firstName:'John',
      lastName: 'Doe'
    }

    const createUserDto = plainToInstance(CreateUserDto, body);
    
    const mockUser = new User(1, 'John', 'Doe');

    userService.createUser.mockResolvedValueOnce(mockUser);

    const result = await createUserUseCase.execute(createUserDto);

    expect(result.data.id).toBe(1);
    expect(result.data.fullName).toBe(`${body.firstName} ${body.lastName}` );
  });


  it('debería lanzar un error si ocurre un problema durante la creación', async () => {
    let body = {
      firstName: 'John',
      lastName: 'Doe',
    };
  
    const createUserDto = plainToInstance(CreateUserDto, body);
  
    userService.createUser.mockRejectedValueOnce(new Error('Error al crear usuario'));
  
    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow('Error al crear usuario');
  
    expect(userService.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      })
    );
  });
})