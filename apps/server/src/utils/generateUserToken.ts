import jwt from 'jsonwebtoken';
import { UserWithRoles } from '../types/users';

export default function generateUserToken(user: UserWithRoles) {
  const accessData = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    roles: user.roles.map(({ id, name, code, scop, spaceName }) => ({
      id,
      name,
      code,
      scop,
      spaceName,
    })),
  };
  const refreshData = { userId: user.id };
  const accessSecretKey: jwt.Secret =
    process.env['JWT_SECRETE_KEY'] ?? 'JWT_SECRETE_KEY';
  const refreshSecretKey: jwt.Secret =
    process.env['JWT_REFRESH_KEY'] ?? 'JWT_REFRESH_KEY';

  const access = jwt.sign(accessData, accessSecretKey, {
    expiresIn: process.env.JWT_ACCESS_TIMEOUT ?? '15m',
  });
  const refresh = jwt.sign(refreshData, refreshSecretKey, {
    expiresIn: process.env.JWT_REFRESH_TIMEOUT ?? '7d',
  });
  return { access, refresh };
}
