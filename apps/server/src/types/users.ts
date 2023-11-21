import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserWithRoles } from 'types/user';

export type UserJwtPayload = JwtPayload & UserWithRoles;

export type AuthenticatedRequest = Request & {
  user: UserJwtPayload;
};
