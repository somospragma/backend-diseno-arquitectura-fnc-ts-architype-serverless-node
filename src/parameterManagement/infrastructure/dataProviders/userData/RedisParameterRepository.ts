import { IParameterRepository } from '@parameterManagement/domain/ports/IParameterRepository';
import Redis from 'ioredis';

export class RedisParameterRepository implements IParameterRepository {
  private client: Redis;

  constructor(client: Redis) {
    this.client = client;
  }

  async get(key: string): Promise<string | null> {
    return this.client.hget('parameters', key);
  }

}
