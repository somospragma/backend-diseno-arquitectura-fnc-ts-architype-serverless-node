export class ErrorResponse extends Error {
    statusCode: number;
    message: string;   
    details?: any;
  
    constructor(message: string, statusCode: number = 500, details?: any) {
      super(message);
      this.name = 'ErrorResponse'; 
      this.message = message; 
      this.statusCode = statusCode;
      this.details = details;
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  