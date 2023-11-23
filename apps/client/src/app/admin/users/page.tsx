import UsersListTable from '@client/components/Tables/UserListTable';
import Header2 from '@client/components/ui/Header2';
import getRoles from '@client/libs/server/getRoles';
import getSpaces from '@client/libs/server/getSpaces';
import getUsers from '@client/libs/server/getUsers';
import { Suspense } from 'react';

async function Page() {
  const users = await getUsers();
  const roles = await getRoles();
  const spaces = await getSpaces();
  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title="Users" />
        </div>
        <Suspense fallback={<div>Loading..</div>}>
          <UsersListTable users={users} roles={roles} spaces={spaces} baseUrl="/admin" />
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
