import getArrayValues from '@libs/utils/getArrayValues';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getAllContactsApi(req, res) {
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const contacts = await prisma.contact.findMany();
    
    return res.status(200).json({
      contacts: contacts,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
