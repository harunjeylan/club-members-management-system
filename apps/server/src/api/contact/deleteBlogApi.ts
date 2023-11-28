import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteContactApi(req, res) {
  const { contactId } = req.params;
  const { contactIds } = req.body;

  try {
    const superAdminAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
   
    if (!superAdminAccessRoles.length) {
      return res.sendStatus(403);
    }
    if (contactId) {
      await prisma.contact.delete({
        where: {
          id: contactId,
        },
      });
    }
    if (contactIds?.length) {
      await prisma.contact.deleteMany({
        where: {
          id: {
            in: contactIds,
          },
        },
      });
    }

    return res.status(200).json({
      deleted: { contactIds, contactId },
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
