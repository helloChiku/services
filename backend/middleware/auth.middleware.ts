import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
/**
 * @desc    Middleware to verify JWT token
 * @access  Private
 */
import {AuthUserPayload} from "../type/express/index";
import responseLib from '../lib/responseLib';
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token){
    const response = responseLib.generateApiResponse(true, null, 'Token required', undefined);
   return res.status(403).send(response)
  }
    

  try {
    const decoded = jwt.verify(token as  string, process.env.JWT_SECRET as string) as AuthUserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    const response = responseLib.generateApiResponse(true, null, 'Invalid Token', undefined);
    return res.status(403).send(response)
    
  }
};