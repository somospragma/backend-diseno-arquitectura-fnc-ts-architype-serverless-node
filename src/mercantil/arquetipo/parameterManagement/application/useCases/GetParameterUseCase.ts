import { ParameterService } from '@parameterManagement/domain/services/ParameterService';

export class GetParameterUseCase {
  private parameterService: ParameterService;

  constructor(parameterService: ParameterService) {
    this.parameterService = parameterService;
  }

  async execute(key: string): Promise<string | null> {
    return this.parameterService.getParameter(key);
  }
}
