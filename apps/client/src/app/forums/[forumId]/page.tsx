import Messages from '@client/components/Forum/Messages';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import getForumDetails from '@client/libs/server/getForumDetails';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function Page({ params }: { params: { forumId: string } }) {
  const user = await getCurrentUser();
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
  }
  if (!userRoles.length) {
    return redirect('/auth/login');
  }
  const forum = await getForumDetails(params.forumId);

  return (
    <main className="w-full">
      <Suspense fallback={<div>Loading..</div>}>
        <Messages forum={forum} />
      </Suspense>
    </main>
  );
}

export default Page;
