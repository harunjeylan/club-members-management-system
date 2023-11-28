import AdminSidebar from '@client/components/Sidebar/AdminSidebar';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
type PropsType = {
  children: ReactNode | ReactNode[];
};
export default async function Layout({ children }: PropsType) {
  const user = await getCurrentUser();
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
  }
  return (
    <main className="flex h-full w-full ">
      {user && userRoles.length ? <AdminSidebar userRoles={userRoles} /> : ''}
      <div className="w-full max-w-[100vw] overflow-x-auto mt-12">
        {children}
      </div>
    </main>
  );
}