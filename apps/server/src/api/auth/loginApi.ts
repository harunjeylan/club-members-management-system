import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import generateUserToken from '../../utils/generateUserToken';
import { Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';

export default async function loginApi(req: Request, res: Response) {
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
      return res.status(409).json({ errors: fromZodError(error).details });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
      include: {
        roles: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            message: 'User Not Found With Credential',
            code: 'login-user',
          },
        ],
      }); // Unauthorized
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: 'Wrong Credential', code: 'login-user' }); // Unauthorized
    }

    const { access, refresh } = generateUserToken(user);

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
      jwt: { access, refresh },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server Error', code: 'login-user' });
  }
}
