import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpClient, HttpRequest } from '@crosscutting/http';
import { ApiResponse } from '@crosscutting/dto/response/ApiResponse';
import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';
import { Logger } from '@crosscutting/logging/Logger';
import { Constants } from '@crosscutting/utils/Constants';

export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, config: Partial<AxiosRequestConfig> = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000,
      ...config,
    });
    this.setupInterceptors();
  }

  async request<T>(data: HttpRequest): Promise<ApiResponse<T>> {
    const { url, method, headers, params, body } = data;

    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>({
        url,
        method,
        headers,
        params,
        data: body,
      });
      return new ApiResponse(response.data, Constants.SUCCESS_HTTP, response.status)
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ErrorResponse(
          error.response.data.message || Constants.FAILED_HTTP,
          error.response.status,
          error.response.data
        );
      }

      throw new ErrorResponse(error.message || Constants.UNEXPECTED_ERROR);
    }
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        Logger.info(`[AxiosHttpClient] Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        Logger.error(`[AxiosHttpClient] Request Error: ${error.message}`);
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response) => {
        Logger.info(`[AxiosHttpClient] Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        Logger.error(`[AxiosHttpClient] Response Error: ${error.message}`);
        return Promise.reject(error);
      }
    );
  }
}
