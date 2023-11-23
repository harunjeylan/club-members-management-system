import UsersListTable from '@client/components/Tables/UserListTable';
import getSpaceUsers from '@client/libs/server/getSpaceUsers';
import { Suspense } from 'react';
import UsersManager from './UsersManager';
import getSpaceRoles from '@client/libs/server/getSpaceRoles';

async function Page({ params }: { params: { spaceName: string } }) {
  const users = await getSpaceUsers(params.spaceName);
  const roles = await getSpaceRoles(params.spaceName);
  return (
    <section className="w-full ">
      <UsersManager roles={roles} users={users} spaceName={params.spaceName} />
    </section>
  );
}

export default Page;
