import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { HttpClient } from '@crosscutting/http';
import { ParameterRepositoryPort } from '@userManagement/domain/ports/out/ParameterRepositoryPort';
import { ParameterResponseDTO } from '@userManagement/infrastructure/dataProviders/restClients/response/ParameterResponseDTO';

export class ParameterRestClient implements ParameterRepositoryPort {
    private readonly httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
      this.httpClient = httpClient;
    }
  
    async getParameter(key: string): Promise<ApiResponse<ParameterResponseDTO>> {
      const response = await this.httpClient.request<any>({
        url: `/parameters/${key}`,
        method: 'GET',
      });
  
      return response.data || null;
    }
}
