import { RoleCode, RoleScop } from "@prisma/client";

export function getUserAccessRoles(
  userRoles: {
    id: string;
    name: string;
    scop: RoleScop;
    code: RoleCode;
    spaceName: string;
  }[],
  roles: {
    scop: RoleScop;
    code: RoleCode;
    spaceName?: string;
  }[]
) {
  return userRoles.filter((userRole) => {
    return roles.find((role) => {
      if (
        !(role.scop === userRole.scop && role.code === userRole.code) &&
        !(!role.spaceName || role.spaceName === userRole.spaceName)
      ) {
        return false;
      }
      return true;
    });
  });
}
