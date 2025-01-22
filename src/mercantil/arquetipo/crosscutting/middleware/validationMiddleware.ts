import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ResponseUtils } from '@crosscutting/utils/ResponseUtils';


export const validateInput = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        ResponseUtils.httpRes(res, "ERROR", 'El cuerpo de la solicitud está vacío.', "Error", 400)
        return;
      }

      const input = plainToInstance(dto, req.body);
      const errors = await validate(input);

      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        ResponseUtils.httpRes(res, "ERROR", formattedErrors, 'Datos de entrada inválidos.', 400)
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
