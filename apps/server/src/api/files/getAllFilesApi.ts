import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import prisma from '../../prisma/PrismaClient';
import { RoleCode, RoleScop } from '@prisma/client';

export default async function getAllFilesAPi(req, res) {
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    ;
    

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const files = await prisma.fileModel.findMany();
    return res.status(200).json({
      files: files,
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
