import { Response } from 'express';

export class ResponseUtils {
  static success<T>(res: Response, data: T, message = 'Success', code = 200): void {
    res.status(code).json({ data, message, code });
  }

  static error(res: Response, message: string, statusCode = 500, error:any = null): void {
    res.status(statusCode).json({ message, code:statusCode, error });
  }
}
