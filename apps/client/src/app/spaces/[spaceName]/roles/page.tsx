import RoleListTable from '@client/components/Tables/RoleListTable';
import getRoles from '@client/libs/server/getRoles';
import getSpaceRoles from '@client/libs/server/getSpaceRoles';
import { Suspense } from 'react';

async function Page({ params }: { params: { spaceName: string } }) {
  const roles = await getSpaceRoles(params.spaceName);
  return (
    <section className="w-full ">
      <Suspense fallback={<div>Loading..</div>}>
          <RoleListTable roles={roles} />
        </Suspense>
    </section>
  );
}

export default Page;
