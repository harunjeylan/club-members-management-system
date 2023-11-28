import { z } from 'zod';
import { RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import prisma from 'apps/server/src/prisma/PrismaClient';
import getFieldsData from '@libs/utils/getFieldsData';

export default async function updateRoleApi(req, res) {
  const { roleId } = req.params;
  const fields = ['name', 'code', 'scop', 'description', 'spaceName'];
  const fieldsData = getFieldsData(req.body, fields);
  const { addUsers, removeUsers, setUsers } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: fieldsData["spaceName"] },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string().optional(),
      code: z
        .enum([RoleCode.ADMIN, RoleCode.EDITOR, RoleCode.MEMBER])
        .optional(),
      scop: z.enum([RoleScop.SUPER, RoleScop.SPACE]).optional(),
      users: z.array(z.string()).optional(),
      description: z.string().optional(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

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

    if (addUsers?.length) {
      fieldsData['users'] = {
        connect: addUsers.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = true;
    }

    if (removeUsers?.length) {
      fieldsData['users'] = {
        disconnect: removeUsers.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = true;
    }
    if (fieldsData['spaceName']?.length) {
      fieldsData["scop"] = RoleScop.SPACE
      populations['space'] = true;
    }

    const role = await prisma.role.update({
      where: {
        id: roleId,
      },
      data: fieldsData,
      include: populations,
    });

    return res.status(200).json({
      role: role,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
