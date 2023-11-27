import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import uploadFiles from '../../helpers/uploadFiles';
import prisma from '../../prisma/PrismaClient';
import { RoleCode, RoleScop } from '@prisma/client';
export default async function uploadFilesApi(req, res) {
  if (!req.files) {
    res.status(400).json({ status: 'error', message: 'Missing files' });
  }
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const uploadedFiles = await uploadFiles(req.files);
    const filesPromise = [];
    uploadedFiles.forEach((uploadedFile) => {
      const file = prisma.fileModel.create({
        data: uploadedFile,
      });
      filesPromise.push(file);
    });

    // Wait for the promises to resolve
    const files = await Promise.all(filesPromise);

    return res.status(200).json({
      files: files,
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
