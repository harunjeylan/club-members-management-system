import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { Suspense } from 'react';
import ForumsManager from './ForumsManager';
import getCategories from '@client/libs/server/getCategories';
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
        <ForumsManager
          user={user}
          forums={space.forums}
          spaceName={params.spaceName}
        />
      </Suspense>
    </section>
  );
}

export default Page;
