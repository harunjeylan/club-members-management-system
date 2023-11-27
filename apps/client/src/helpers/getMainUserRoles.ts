import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';
import { UserWithAll } from 'types/user';

export default function getMainUserRoles(user: UserWithAll) {
  const spaceRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
    { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
  ]);
  const memberRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.MEMBER },
    { scop: RoleScop.SPACE, code: RoleCode.MEMBER },
  ]);
  const superAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
  ]);
  return {
    spaceRoles,
    memberRoles,
    superAdminRoles,
  };
}
