import { Response } from 'express';
import { ErrorResponse } from '@crosscutting/dto/response/ErrorResponse';
import { ResponseUtils } from '@crosscutting/utils/ResponseUtils';
import { Constants } from '@crosscutting/utils/Constants';


export const handleErrors = async (action: () => Promise<any>, res: Response): Promise<void> => {
  try {
    const response = await action();    
    ResponseUtils.httpRes(res, Constants.SUCCESS, response.data, response.message, response.statusCode, response.timestamp, response.transactionId);
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      ResponseUtils.httpRes(res, Constants.ERROR, error.message, "Error", error.statusCode);
    } else if (error instanceof Error) {
      ResponseUtils.httpRes(res, Constants.ERROR, error.message, "Error", 500);
    } else {
      ResponseUtils.httpRes(res, Constants.ERROR, Constants.UNEXPECTED_ERROR, "Error", 500);
    }
  }
};
