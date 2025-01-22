import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { handleFunctionErrors } from '@crosscutting/helpers/handleFunctionErrors';
import { RedisParameterRepository } from '@parameterManagement/infrastructure/dataProviders/userData/RedisParameterRepository';
import { ParameterService } from '@parameterManagement/domain/services/ParameterService';
import { GetParameterUseCase } from '@parameterManagement/application/useCases/GetParameterUseCase';
import { createRedisClient } from '@crosscutting/configuration/AppConfig';
import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';
import { Constants } from '@crosscutting/utils/Constants';

// Nombre dinámico de la función
const functionName = `NOVA-${process.env.VALIDATION_TYPE}-${process.env.FUNCTION_NAME_OBTAIN_PARAMETER}-${process.env.ENVIRONMENT}-${process.env.REGION}`;

async function handler(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Executing Azure Function: ${functionName}`);

  return handleFunctionErrors(context, async () => {
    const transactionId = req.headers.get('transactionId');
    // const redisClient = createRedisClient();
    const key = req.params.key;

    if (!key) {
      return {
        status: 400,
        body: JSON.stringify(new ErrorResponse(Constants.NOT_FOUND, 400)),
      };
    }

    // const repository = new RedisParameterRepository(redisClient);
    // const service = new ParameterService(repository);
    // const getParameterUseCase = new GetParameterUseCase(service);
    // const parameterValue = await getParameterUseCase.execute(key);
    // context.log(parameterValue, transactionId);

    return {
      status: 200,
      body: JSON.stringify(new ApiResponse("correcto", Constants.DATA_FOUND, 200)),
    };
  });
}

app.http(functionName, {
  methods: ['GET'],
  authLevel: 'function',
  route: 'parameters/{key}',
  handler: handler,
});
