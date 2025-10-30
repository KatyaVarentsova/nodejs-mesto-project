import { Request, Response, NextFunction } from 'express';
import { statusCode } from '../types';
import { z } from 'zod';

const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    });

    if (!result.success) {
      return res.status(statusCode.badRequest).json({
        statusCode: statusCode.badRequest,
        error: 'Bad Request',
        message: result.error.errors,
      });
    }

    next();
  };
};

export default validateRequest;