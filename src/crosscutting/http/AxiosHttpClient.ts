import axios, { AxiosInstance } from 'axios';
import { HttpClient, HttpRequest, HttpResponse } from './HttpClient';

export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000,
    });
  }

  async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
    const { url, method, headers, params, body } = data;

    try {
      const response = await this.axiosInstance.request<T>({
        url,
        method,
        headers,
        params,
        data: body,
      });

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      if (error.response) {
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      } else {
        throw new Error(error.message);
      }
    }
  }
}
