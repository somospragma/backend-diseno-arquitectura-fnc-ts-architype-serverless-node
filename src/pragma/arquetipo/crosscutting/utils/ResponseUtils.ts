import { Response } from 'express';

export class ResponseUtils {
  static httpRes<T>(res: Response, status:string, data: T, message = 'Success', statusCode = 200, timestamp = new Date(), transactionId = ""): void {
    res.status(statusCode).json({ statusCode:statusCode, status, data, message, timestamp, transactionId });
  }
}
