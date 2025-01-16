import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';


export const validateInput = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
          message: 'El cuerpo de la solicitud está vacío.',
        });
        return;
      }

      const input = plainToInstance(dto, req.body);
      const errors = await validate(input);

      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        res.status(400).json({
          message: 'Datos de entrada inválidos.',
          errors: formattedErrors,
        });
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
