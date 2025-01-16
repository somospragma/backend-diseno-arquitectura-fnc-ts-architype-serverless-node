import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from '@crosscutting/configuration/AppConfig';
import { UserController } from '@userManagement/infrastructure/controllers/UserController';

const app = express();
app.use(express.json());

// Inicializar TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Registrar rutas
    app.use('/api', UserController);
    app.use(express.json());


    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err:any) => {
    console.error('Error during Data Source initialization:', err);
  });
