import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteFilesAPi(req, res) {
  const { fileName } = req.params;
  const { fileIds } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    if (fileIds?.length) {
      await prisma.fileModel.deleteMany({
        where: {
          id: {
            in: fileIds,
          },
        },
      });
    }
    if (fileName) {
      await prisma.fileModel.delete({
        where: {
          name: fileName,
        },
      });
    }
    return res.status(200).json({
      deleted: { fileName, fileIds },
      message: 'files deleted',
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
