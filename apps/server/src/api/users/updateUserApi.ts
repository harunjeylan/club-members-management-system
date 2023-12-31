import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../../../../libs/utils/getFieldsData';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';
import { fromZodError } from 'zod-validation-error';

export default async function updateUserApi(req, res) {
  const { userId } = req.params;
  const fields = ['username', 'first_name', 'last_name', 'email'];
  const fieldsData = getFieldsData(req.body, fields);
  const {
    addSpaces,
    addRoles,
    removeSpaces,
    removeRoles,
    setSpaces,
    setRoles,
  } = req.body;

  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    const adminRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      username: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      email: z.string().email().optional(),
      roles: z.array(z.string()).optional(),
      spaces: z.array(z.string()).optional(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);
    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
    }

    let populations = {};
    if (setSpaces?.length) {
      fieldsData['spaces'] = {
        set: setSpaces.map((spaceName: string) => ({
          name: spaceName,
        })),
      };
      populations['spaces'] = true;
    }

    if (!!adminRoles.length && setRoles?.length) {
      fieldsData['roles'] = {
        set: setRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
      populations['roles'] = true;
    }
    if (addSpaces?.length) {
      fieldsData['spaces'] = {
        connect: addSpaces.map((spaceName: string) => ({
          name: spaceName,
        })),
      };
      populations['spaces'] = true;
    }
    if (!!adminRoles.length && addRoles?.length) {
      fieldsData['roles'] = {
        connect: addRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
      populations['roles'] = true;
    }
    if (removeSpaces?.length) {
      fieldsData['spaces'] = {
        disconnect: removeSpaces.map((spaceName: string) => ({
          name: spaceName,
        })),
      };
      populations['spaces'] = true;
    }
    if (!!adminRoles.length && removeRoles?.length) {
      fieldsData['roles'] = {
        disconnect: removeRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
      populations['roles'] = true;
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: fieldsData,
      include: populations,
    });

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
