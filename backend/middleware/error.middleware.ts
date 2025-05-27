import { Request, Response, NextFunction } from 'express';
import responseLib  from '../lib/responseLib'
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  let message =  err.message || 'Internal Server Error';
  let stack = process.env.NODE_ENV === 'development' ? err.stack : undefined
  const response = responseLib.generateApiResponse(true, null,message , stack)
  res.status(statusCode).send(response)
};

