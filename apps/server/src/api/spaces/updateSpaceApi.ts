import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../../../../libs/utils/getFieldsData';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';
import { fromZodError } from 'zod-validation-error';

export default async function updateSpaceApi(req, res) {
  const { spaceName } = req.params;
  const fields = ['name', 'isPrivate', 'description'];
  const fieldsData = getFieldsData(req.body, fields);
  const { addUsers, addRoles, removeUsers, removeRoles, setUsers, setRoles } =
    req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR, spaceName: spaceName },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string().optional(),
      isPrivate: z.boolean().optional(),
      description: z.string().optional(),
      addUsers: z.array(z.string()).optional(),
      addRoles: z.array(z.string()).optional(),
      removeUsers: z.array(z.string()).optional(),
      removeRoles: z.array(z.string()).optional(),
      setUsers: z.array(z.string()).optional(),
      setRoles: z.array(z.string()).optional(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      ...fieldsData,
      addUsers,
      addRoles,
      removeUsers,
      removeRoles,
      setUsers,
      setRoles,
    });
    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
    }
    let populations = {};
    if (setUsers?.length) {
      fieldsData['users'] = {
        set: setUsers.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = {
        include: {
          profile: true,
        },
      };
    }
    if (setRoles?.length) {
      fieldsData['roles'] = {
        set: setRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
      populations['roles'] = true;
    }
    if (addUsers?.length) {
      fieldsData['users'] = {
        connect: addUsers.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = {
        include: {
          profile: true,
        },
      };
    }
    if (addRoles?.length) {
      fieldsData['roles'] = {
        connect: addRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
    }
    if (removeUsers?.length) {
      fieldsData['users'] = {
        disconnect: removeUsers.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = {
        include: {
          profile: true,
        },
      };
    }
    if (removeRoles?.length) {
      fieldsData['roles'] = {
        disconnect: removeRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
      populations['roles'] = true;
    }
    const space = await prisma.space.update({
      where: {
        name: spaceName,
      },
      data: fieldsData,
      include: populations,
    });

    return res.status(200).json({
      space: space,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
