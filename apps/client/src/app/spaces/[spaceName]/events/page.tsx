import UsersListTable from '@client/components/Tables/UserListTable';
import getSpaceUsers from '@client/libs/server/getSpaceUsers';
import getUsers from '@client/libs/server/getUsers';
import { Suspense } from 'react';

async function Page({ params }: { params: { spaceName: string } }) {
  const users = await getSpaceUsers(params.spaceName);
  return (
    <section className="w-full ">
      <Suspense fallback={<div>Loading..</div>}>
      </Suspense>
    </section>
  );
}

export default Page;
