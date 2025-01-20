import { ApiResponse } from "@crosscutting/dto/response/ApiResponse";

export interface HttpRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    params?: Record<string, string | number>;
    body?: any;
  }
  
  
  export interface HttpClient {
    request<T>(data: HttpRequest): Promise<ApiResponse<T>>;
  }
  