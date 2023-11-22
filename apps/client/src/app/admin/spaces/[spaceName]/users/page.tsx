import UsersListTable from '@client/components/Tables/UserListTable';
import getSpaceUsers from '@client/libs/server/getSpaceUsers';
import { Suspense } from 'react';

async function Page({ params }: { params: { spaceName: string } }) {
  const users = await getSpaceUsers(params.spaceName);
  return (
    <section className="w-full ">
      <Suspense fallback={<div>Loading..</div>}>
        <UsersListTable users={users} />
      </Suspense>
    </section>
  );
}

export default Page;
