import { Response } from 'express';
import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';
import { ResponseUtils } from '@crosscutting/utils/ResponseUtils';


export const handleErrors = async (action: () => Promise<any>, res: Response): Promise<void> => {
  try {
    const response = await action();
    ResponseUtils.success(res, response.data, response.message, response.code);
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      ResponseUtils.error(res, error.message, error.statusCode);
    } else if (error instanceof Error) {
      ResponseUtils.error(res, error.message, 500);
    } else {
      ResponseUtils.error(res, 'An unexpected error occurred', 500);
    }
  }
};
