export interface HttpRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    params?: Record<string, string | number>;
    body?: any;
  }
  
  export interface HttpResponse<T = any> {
    status: number;
    data: T;
  }
  
  export interface HttpClient {
    request<T>(data: HttpRequest): Promise<HttpResponse<T>>;
  }
  