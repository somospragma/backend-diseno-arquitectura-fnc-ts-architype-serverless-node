import { ApiResponse } from "@crosscutting/dto/response/ApiResponse";
import { ParameterResponseDTO } from "@userManagement/infrastructure/dataProviders/restClients/response/ParameterResponseDTO";

export interface ParameterRepositoryPort {
    getParameter(key: string): Promise<ApiResponse<ParameterResponseDTO>>;
  }
  