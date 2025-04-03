import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';
import { Constants } from '@crosscutting/utils/Constants';
import { IParameterRepository } from '@parameterManagement/domain/ports/IParameterRepository';


export class ParameterService {
  private repository: IParameterRepository;

  constructor(repository: IParameterRepository) {
    this.repository = repository;
  }

  async getParameter(key: string): Promise<string | null> {
    const response = await this.repository.get(key);    
    if (response == null){
      throw new ErrorResponse(Constants.NOT_FOUND, 404)
    }
    return response
  }

}