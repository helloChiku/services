import { Request, Response, NextFunction } from 'express';

function sanitizeString(str: string) {
  return str.replace(/<.*?>/g, ''); // Remove HTML tags
}

function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') return sanitizeString(obj);

  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      obj[key] = sanitizeObject(obj[key]);
    }
  }

  return obj;
}

/**
 * @desc    Sanitize incoming request body, query, and params to prevent XSS
 */
export const xssSanitizer = (req: Request, res: Response, next: NextFunction) => {
  req.body = sanitizeObject(req.body);
  req.query = sanitizeObject(req.query);
  req.params = sanitizeObject(req.params);
  next();
};
