import { Request, Response, Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserService } from '@userManagement/domain/services/UserService';
import { UserDataProvider } from '@userManagement/infrastructure/dataProviders/userData/userDataProvider';
import { GetUserUseCase } from '@userManagement/application/useCases/GetUserUseCase';
import { CreateUserUseCase } from '@userManagement/application/useCases/CreateUserUseCase';
import { GetAllUsersUseCase } from '@userManagement/application/useCases/GetAllUsersUseCase';
import { UpdateUserUseCase } from '@userManagement/application/useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from '@userManagement/application/useCases/DeleteUserUseCase';
import { validateInput } from '@crosscutting/middleware/validationMiddleware';
import { CreateUserDto } from '@userManagement/application/dto/request/CreateUserDto';
import { UpdateUserDto } from '@userManagement/application/dto/request/UpdateUserDto';
import { PaginationRequestDto } from '@crosscutting/dto/request/PaginationRequestDto';
import { handleErrors } from '@crosscutting/middleware/ErrorHandlingMiddleware';
import { UserMapper } from '@userManagement/application/mappers/UserMapper';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { AxiosHttpClient } from '@crosscutting/http';
import { ParameterRestClient } from '@userManagement/infrastructure/dataProviders/restClients/implementation/parameterRestClient';

// Inicializamos el cliente HTTP
const httpClient = new AxiosHttpClient(process.env.PARAMETER_BASE_URL || 'http://localhost:3000/api');

// Configuración de dependencias
const parameterRepository = new ParameterRestClient(httpClient);

const userRepository = new UserDataProvider();
const userService = new UserService(userRepository, parameterRepository);
const getUserUseCase = new GetUserUseCase(userService);
const getAllUsersUseCase = new GetAllUsersUseCase(userService);
const createUserUseCase = new CreateUserUseCase(userService);
const updateUserUseCase = new UpdateUserUseCase(userService);
const deleteUserUseCase = new DeleteUserUseCase(userService);


export const UserController = Router();


UserController.get('/users', async (req: Request, res: Response) => {
  const paginationDto = new PaginationRequestDto(req.query);
  await handleErrors(
    async () => {
      const response = await getAllUsersUseCase.execute(paginationDto);
      return new ApiResponse(response, 'Users fetched successfully')
    },
    res
  );
});

UserController.get('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  await handleErrors(
    async () => {
      const response = await getUserUseCase.execute(userId);
      const userDto = UserMapper.toDto(response);
      return new ApiResponse(userDto, 'User retrieved successfully');
    },
    res
  );
});

UserController.post(
  '/users',
  validateInput(CreateUserDto),
  async (req: Request, res: Response) => {
    const createUserDto = plainToInstance(CreateUserDto, req.body);
    await handleErrors(
      async () => {
        const response = await createUserUseCase.execute(createUserDto);
        const createdUserDto = UserMapper.toDto(response);
        return new ApiResponse(createdUserDto, 'User created successfully', 201);       
      },
      res
    );
  }
);

UserController.patch(
  '/users/:id',
  validateInput(UpdateUserDto),
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const updateUserDto = plainToInstance(UpdateUserDto, req.body);
    await handleErrors(
      async () => {
        const response = await updateUserUseCase.execute(userId, updateUserDto);
        return new ApiResponse(response, 'Usuario actualizado con éxito.');
      },
      res
    );
  }
);

UserController.delete('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  await handleErrors(
    async () => {
      await deleteUserUseCase.execute(userId);
      return new ApiResponse(null, 'User created successfully', 204);       
    },
    res
  );
});

UserController.get('/users', async (req: Request, res: Response) => {
  const paginationDto = new PaginationRequestDto(req.query);
  await handleErrors(
    async () => {
      const response = await getAllUsersUseCase.execute(paginationDto);
      return new ApiResponse(response, 'Users fetched successfully')
    },
    res
  );
});
