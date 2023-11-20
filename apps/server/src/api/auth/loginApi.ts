import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import generateUserToken from '../../utils/generateUserToken';

export default async function loginApi(req, res) {
  const { identifier, password } = req.body;
  try {
    const zodSchema = z.object({
      identifier: z.string().or(z.string().email()),
      password: z.string().min(6),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      identifier,
      password,
    });

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'login-user',
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
      include: {
        roles: true,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: 'Unauthorized', code: 'login-user' }); // Unauthorized
    }
    
    const { access, refresh } = generateUserToken(user);

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
      jwt: { access, refresh },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Server Error', code: 'login-user' });
  }
}
