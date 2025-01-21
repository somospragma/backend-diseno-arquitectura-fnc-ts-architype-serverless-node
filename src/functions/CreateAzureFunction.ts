import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CreateUserDto } from '@userManagement/application/dto/request/CreateUserDto';
import { UserMapper } from '@userManagement/application/mappers/UserMapper';
import { CreateUserUseCase } from '@userManagement/application/useCases/CreateUserUseCase';
import { UserService } from '@userManagement/domain/services/UserService';
import { UserDataProvider } from '@userManagement/infrastructure/dataProviders/userData/userDataProvider';
import { AxiosHttpClient } from '@crosscutting/http';
import { ParameterRestClient } from '@userManagement/infrastructure/dataProviders/restClients/implementation/ParameterRestClient';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { handleFunctionErrors } from '@crosscutting/helpers/handleFunctionErrors';

// Configuración de dependencias
const userRepository = new UserDataProvider();
const httpClient = new AxiosHttpClient(process.env.PARAMETER_BASE_URL || 'http://localhost:3000/api');
const parameterRepository = new ParameterRestClient(httpClient);
const userService = new UserService(userRepository, parameterRepository);
const createUserUseCase = new CreateUserUseCase(userService);

// Nombre dinámico de la función
const functionName = `NOVA-${process.env.VALIDATION_TYPE || 'DefaultValidation'}-${process.env.FUNCTION_NAME || 'CreateUser'}-${process.env.ENVIRONMENT || 'Dev'}-${process.env.REGION || 'US'}`;

async function createUserHandler(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Executing Azure Function: ${functionName}`);

  return handleFunctionErrors(context, async () => {
    
    const transactionId = req.headers.get("transactionId")

    const createUserDto = plainToInstance(CreateUserDto, await req.json());
    await validateOrReject(createUserDto);
    const createdUser = await createUserUseCase.execute(createUserDto);
    return {
      status: 201,
      jsonBody: new ApiResponse(UserMapper.toDto(createdUser), 'User created successfully', 201),
    };
  });
}

app.http(functionName, {
  methods: ['POST'],
  authLevel: 'function',
  route: 'users',
  handler: createUserHandler,
});
