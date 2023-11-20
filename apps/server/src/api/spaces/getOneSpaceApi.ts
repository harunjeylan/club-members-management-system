import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '../../utils/getUserAccessRoles';

export default async function getOneSpaceApi(req, res) {
  const { spaceName } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    const space = await prisma.space.findFirst({
      where: {
        name: spaceName,
      },
    });
    return res.status(200).json({
      space: space,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  } 
}
