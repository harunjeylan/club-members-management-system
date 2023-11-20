import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedRequest, UserJwtPayload } from '../types/users';

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const secretKey: jwt.Secret =
    process.env['JWT_SECRETE_KEY'] ?? 'JWT_SECRETE_KEY';
  try {
    const user = jwt.verify(token, secretKey) as UserJwtPayload;

    
    if (!user) {
      return res.sendStatus(403);
    }

    if (typeof user === 'object') {
      req['user'] = user;
    }

    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
}
