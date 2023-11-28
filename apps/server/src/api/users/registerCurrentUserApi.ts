import { Role, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import generateUserToken from '../../utils/generateUserToken';

export default async function registerCurrentUserApi(req, res) {
  const { username, first_name, last_name, email, password } = req.body;
  try {
    ;

    const zodSchema = z.object({
      username: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-user',
      });
    }

    let userExist = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userExist) {
      return res
        .status(409)
        .json({ message: 'Username already exists', code: 'register-user' });
    }
    userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      return res
        .status(409)
        .json({ message: 'Email already exists', code: 'register-user' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
      include: {
        roles: true,
      },
    });
    await prisma.profile.create({
      data: {
        user: {
          connect: { id: user.id },
        },
      },
    });
    const { access, refresh } = generateUserToken(user);
    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
      jwt: { access, refresh },
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'register-user' });
  }
}
