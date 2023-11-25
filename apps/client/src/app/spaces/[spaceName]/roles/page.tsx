import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { Suspense } from 'react';
import RolesManager from './RolesManager';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/auth/login');
  }
  return (
    <section className="w-full ">
      <Suspense fallback={<div>Loading..</div>}>
        <RolesManager
          user={user}
          spaceName={params.spaceName}
          roles={space.roles}
        />
      </Suspense>
    </section>
  );
}

export default Page;
