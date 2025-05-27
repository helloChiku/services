import { Request, Response, NextFunction } from 'express';

/**
 * @desc    Prevent HTTP Parameter Pollution by only keeping the first value
 */
export const preventHPP = (req: Request, res: Response, next: NextFunction) => {
  const sanitize = (obj: any) => {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key][0]; // Keep only the first value
      }
    }
  };

  sanitize(req.query);
  sanitize(req.body);
  next();
};
