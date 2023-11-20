import { Role, User } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

type UserWithRoles = User & {
  roles: Role[];
};

export type UserJwtPayload = JwtPayload & UserWithRoles;

export type AuthenticatedRequest = Request & {
  user: UserJwtPayload;
};
