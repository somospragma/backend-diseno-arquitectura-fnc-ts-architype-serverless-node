// @ts-ignore
import { CreateUserUseCase } from '@userManagement/application/useCases/CreateUserUseCase';
// @ts-ignore
import { UserService } from '@userManagement/domain/services/UserService';
// @ts-ignore
import { User } from '@userManagement/domain/models/User';
// @ts-ignore
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
    
    const mockUser = new User(1, 'John', 'Doe', '2001-15-06');

    userService.createUser.mockResolvedValueOnce(mockUser);

    const result = await createUserUseCase.execute(createUserDto);

    expect(result.id).toBe(1);
    expect(result.firstName).toBe(body.firstName);
    expect(result.lastName).toBe(body.lastName)
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