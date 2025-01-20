import 'tsconfig-paths/register';
import { DataSource } from 'typeorm';
import Redis from 'ioredis';
import { User } from '@userManagement/domain/models/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database',
  entities: [User],
  migrations: ['dist/infrastructure/migrations/*.js'],
  synchronize: false,
  logging: process.env.PRODUCTION ? false:true,
});



export const createRedisClient = (): Redis => {
  return new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  });
};
