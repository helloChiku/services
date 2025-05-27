import { JwtPayload } from 'jsonwebtoken';

export interface AuthUserPayload {
  id: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload | JwtPayload;
    }
  }
}
