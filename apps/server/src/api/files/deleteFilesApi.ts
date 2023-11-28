import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import deleteFiles from '@server/helpers/deleteFiles';

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
    let files = [];
    if (fileIds?.length) {
      files = await prisma.fileModel.findMany({
        where: {
          id: {
            in: fileIds,
          },
        },
      });
    }
    if (fileName) {
      const file = await prisma.fileModel.findFirst({
        where: {
          name: fileName,
        },
      });
      files.push(file);
    }
    const filesPromise = [];
    ;
    
    files.forEach((file) => {
      filesPromise.push(deleteFiles(file.name));
    });

    await Promise.all(filesPromise);
    await prisma.fileModel.deleteMany({
      where: {
        id: {
          in: files.map((file) => file.id),
        },
      },
    });
    return res.status(200).json({
      deleted: { fileName, fileIds },
      message: 'files deleted',
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
