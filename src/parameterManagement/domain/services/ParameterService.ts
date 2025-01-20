import { IParameterRepository } from '@parameterManagement/domain/ports/IParameterRepository';


export class ParameterService {
  private repository: IParameterRepository;

  constructor(repository: IParameterRepository) {
    this.repository = repository;
  }

  async getParameter(key: string): Promise<string | null> {
    return this.repository.get(key);
  }

}