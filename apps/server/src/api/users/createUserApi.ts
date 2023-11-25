import { RoleCode, RoleScop } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function createUserApi(req, res) {
  const { username, first_name, last_name, email, password } = req.body;
  const { addSpaces, addRoles } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
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
    const fieldsData = {
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    let populations = {};

    if (addSpaces?.length) {
      fieldsData['spaces'] = {
        connect: addSpaces.map((spaceName: string) => ({
          name: spaceName,
        })),
      };
      populations['spaces'] = true;
    }
    if (addRoles?.length) {
      fieldsData['roles'] = {
        connect: addRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
      populations['roles'] = true;
    }

    const user = await prisma.user.create({
      data: fieldsData,
      include: populations,
    });
    const profile = await prisma.profile.create({
      data: {
        user: {
          connect: { id: user.id },
        },
      },
      include: {
        image: true,
      },
    });
    return res.status(200).json({
      user: prisma.$exclude({ ...user, profile }, ['password']),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
