import { Request, Response, Router } from 'express';
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
import { plainToInstance } from 'class-transformer';


const userRepository = new UserDataProvider();
const userService = new UserService(userRepository);
const getUserUseCase = new GetUserUseCase(userService);
const getAllUsersUseCase = new GetAllUsersUseCase(userService);
const createUserUseCase = new CreateUserUseCase(userService);
const updateUserUseCase = new UpdateUserUseCase(userService);
const deleteUserUseCase = new DeleteUserUseCase(userService);

export const UserController = Router();


UserController.get('/users', async (req: Request, res: Response) => {
  const paginationDto = new PaginationRequestDto(req.query);
  await handleErrors(() => getAllUsersUseCase.execute(paginationDto), res);
});

UserController.get('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  await handleErrors(() => getUserUseCase.execute(userId), res);
});

UserController.post(
  '/users',
  validateInput(CreateUserDto),
  async (req: Request, res: Response) => {    
    const createUserDto = plainToInstance(CreateUserDto, req.body);
    await handleErrors(() => createUserUseCase.execute(createUserDto), res);
  }
);

UserController.patch(
  '/users/:id',
  validateInput(UpdateUserDto),
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const updateUserDto = plainToInstance(UpdateUserDto, req.body);
    await handleErrors(() => updateUserUseCase.execute(userId, updateUserDto), res);
  }
);

UserController.delete('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  await handleErrors(() => deleteUserUseCase.execute(userId), res);
});
