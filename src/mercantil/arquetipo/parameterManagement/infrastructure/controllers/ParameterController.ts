import { Router, Request, Response } from 'express';
import { RedisParameterRepository } from '@parameterManagement/infrastructure/dataProviders/userData/RedisParameterRepository';
import { ParameterService } from '@parameterManagement/domain/services/ParameterService';
import { GetParameterUseCase } from '@parameterManagement/application/useCases/GetParameterUseCase';
import { handleErrors } from '@crosscutting/middleware/ErrorHandlingMiddleware';
import Redis from 'ioredis';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { Parameter } from '@parameterManagement/application/dto/response/Parameter';
import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';


export const ParameterController = (redisClient: Redis): Router => {

  const repository = new RedisParameterRepository(redisClient);
  const service = new ParameterService(repository);
  const getParameterUseCase = new GetParameterUseCase(service);

  const router = Router();

  router.get('/parameters/:key', async (req: Request, res: Response) => {
    await handleErrors(
      async () => {
        const response = await getParameterUseCase.execute(req.params.key);
        if(response){
          const parameter = new Parameter(req.params.key, response)
          return new ApiResponse(parameter, 'Valor obtenido con éxito');
        }
        throw new ErrorResponse('Key no existente', 404)
      },
      res
    );
  });

  return router;

};


