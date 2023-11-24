import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../../../../libs/utils/getFieldsData';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';

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
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string().or(z.undefined()),
      isPrivate: z.boolean().or(z.undefined()),
      description: z.string().or(z.undefined()),
      addUsers: z.array(z.string()).or(z.undefined()),
      addRoles: z.array(z.string()).or(z.undefined()),
      removeUsers: z.array(z.string()).or(z.undefined()),
      removeRoles: z.array(z.string()).or(z.undefined()),
      setUsers: z.array(z.string()).or(z.undefined()),
      setRoles: z.array(z.string()).or(z.undefined()),
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
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-user',
      });
    }
    let populations = {};
    if (setUsers?.length) {
      fieldsData['users'] = {
        set: setUsers.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = true;
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
      populations['users'] = true;
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
      populations['users'] = true;
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
    });

    return res.status(200).json({
      space: space,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
