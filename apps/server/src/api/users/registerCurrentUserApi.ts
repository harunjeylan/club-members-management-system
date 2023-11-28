import { Role, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import generateUserToken from '../../utils/generateUserToken';
import { fromZodError } from 'zod-validation-error';
export default async function registerCurrentUserApi(req, res) {
  const { username, first_name, last_name, email, password } = req.body;
  try {
    const zodSchema = z.object({
      username: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least 1 numeric character'),
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
      return res.status(409).json({ errors: fromZodError(error).details });
    }

    let userExist = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userExist) {
      return res.status(409).json({
        errors: [
          {
            path: ['username'],
            message: 'Username already exists',
            code: 'register-user',
          },
        ],
      });
    }
    userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      return res
        .status(409)
        .json({
          errors: [
            {
              path: ['email'],
              message: 'Email already exists',
              code: 'register-user',
            },
          ],
        });
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
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
