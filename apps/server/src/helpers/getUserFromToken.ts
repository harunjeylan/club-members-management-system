import * as jwt from 'jsonwebtoken';
import { UserJwtPayload } from '../types/users';

export function getUserFromToken(token: string) {
  const secretKey: jwt.Secret =
    process.env['JWT_SECRETE_KEY'] ?? 'JWT_SECRETE_KEY';
  try {
    const user = jwt.verify(token, secretKey) as UserJwtPayload;

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
}
