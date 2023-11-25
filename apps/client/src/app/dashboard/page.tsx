import getCurrentUser from '@client/libs/server/getCurrentUser';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';
import { redirect } from 'next/navigation';
import SuperAdminDashboard from './SuperAdminDashboard';
import SpaceAdminDashboard from './SpaceAdminDashboard';
import MemberAdminDashboard from './MemberAdminDashboard';

async function Page() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/auth/login');
  }
  const superAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
  ]);
  if (!!superAdminRoles.length) {
    return (
      <main>
        <SuperAdminDashboard />
      </main>
    );
  }
  const spaceRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
    { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
  ]);
  if (!!spaceRoles.length) {
    return (
      <main>
        <SpaceAdminDashboard />
      </main>
    );
  }
  const memberRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.MEMBER },
    { scop: RoleScop.SPACE, code: RoleCode.MEMBER },
  ]);
  if (!!memberRoles.length) {
    return (
      <main>
        <MemberAdminDashboard />
      </main>
    );
  }
  return <main></main>;
}

export default Page;
