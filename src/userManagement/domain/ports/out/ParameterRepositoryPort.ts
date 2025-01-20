import { ApiResponse } from "@crosscutting/dto/response/ApiResponse";

export interface ParameterRepositoryPort {
    getParameter(key: string): Promise<ApiResponse<any>>;
  }
  