import { Role, RoleCode, RoleScop } from '@prisma/client';

export function getUserAccessRoles(
  userRoles: Partial<Role>[],
  roles: {
    scop: RoleScop;
    code: RoleCode;
    spaceName?: string;
  }[]
) {
  return userRoles.filter((userRole) => {
    return !!roles.find((role) => {
      if (role.scop === userRole.scop && role.code === userRole.code) {
        if (Object.keys(role).includes('spaceName')) {
          if (role.spaceName === userRole.spaceName) {
            return true;
          }
          return false;
        }
        return true
      }
      return false;
    });
  });
}
