export class ApiResponse<T> {
    data: T;
    message: string;
    code: number;
  
    constructor(data: T, message: string, code: number = 200) {
      this.data = data;
      this.message = message;
      this.code = code
    }
  }
  