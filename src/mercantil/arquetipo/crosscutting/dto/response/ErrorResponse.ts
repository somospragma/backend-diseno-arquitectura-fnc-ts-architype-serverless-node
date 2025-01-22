export class ErrorResponse extends Error {
    statusCode: number;  
    status: string;
    data: any;
    message: string;
    timestamp: Date;
    transactionId: string;
  
    constructor(message: string, statusCode: number = 500, data?: any, transactionId:string = "") {
      super(message);
      this.message = message;
      this.status = "ERROR"
      this.statusCode = statusCode;
      this.data = data;
      this.timestamp = new Date()
      this.transactionId = transactionId
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  