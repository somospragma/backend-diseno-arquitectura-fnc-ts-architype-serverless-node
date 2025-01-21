import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from '@crosscutting/configuration/AppConfig';
import { UserController } from '@userManagement/infrastructure/controllers/UserController';
import { createRedisClient } from '@crosscutting/configuration/AppConfig';
import { ParameterController } from '@parameterManagement/infrastructure/controllers/ParameterController';

const appRouter = express();
appRouter.use(express.json());



//Inicializa el cliente Redis
const redisClient = createRedisClient();

//Inicializar TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Registrar rutas
    appRouter.use('/api', UserController, ParameterController(redisClient));
    appRouter.use(express.json());


    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    appRouter.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err:any) => {
    console.error('Error during Data Source initialization:', err);
  });


