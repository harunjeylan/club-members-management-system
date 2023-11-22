import { RoleCode, RoleScop } from '@prisma/client';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteSpaceApi(req, res) {
  const { spaceName } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    await prisma.space.delete({
      where: {
        name: spaceName,
      },
    });
    return res.status(200).json({
      message: 'Space deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  } 
}
