import jwt from 'jsonwebtoken';
import prisma from '../../prisma/PrismaClient';
import { UserJwtPayload } from '../../types/users';
import generateUserToken from '../../utils/generateUserToken';

export default async function refreshApi(req, res) {
  const { refresh: refreshToken } = req.body;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'refresh fiend required', code: 'refresh-token' }); // Unauthorized
  }
  const secretKey: jwt.Secret =
    process.env['JWT_SECRETE_KEY'] ?? 'JWT_SECRETE_KEY';
  try {
    const result = jwt.verify(refreshToken, secretKey) as UserJwtPayload;
    if (typeof result === 'object') {
      req.user = result['user'];
    }

    const user = await prisma.user.findFirst({
      where: {
        id: result.userId,
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User Not Exist', code: 'refresh-token' });
    }
    const { access, refresh } = generateUserToken(user);
    return res.status(200).json({ access, refresh });
  } catch (error) {
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
}
