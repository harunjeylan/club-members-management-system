import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { Suspense } from 'react';
import RolesManager from './RolesManager';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  return (
    <section className="w-full ">
      <Suspense fallback={<div>Loading..</div>}>
        <RolesManager spaceName={params.spaceName} roles={space.roles} />
      </Suspense>
    </section>
  );
}

export default Page;
