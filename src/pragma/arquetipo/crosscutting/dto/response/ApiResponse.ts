import { Constants } from "@crosscutting/utils/Constants";
export class ApiResponse<T> {
    statusCode: number;  
    status: string;
    data: T;
    message: string;
    timestamp: Date;
    transactionId: string;
  
    constructor(data: T, message: string, statusCode: number = 200, transactionId:string = "") {
      this.statusCode = statusCode;
      this.status =  Constants.SUCCESS
      this.message = message;
      this.data = data;
      this.timestamp = new Date()
      this.transactionId = transactionId
    }
  }
  