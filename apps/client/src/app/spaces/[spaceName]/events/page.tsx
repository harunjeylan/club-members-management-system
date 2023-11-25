import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { Suspense } from 'react';
import EventsManager from './EventsManager';
import getCategories from '@client/libs/server/getCategories';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  const categories = await getCategories();
  console.log(space.events);
  
  return (
    <section className="w-full ">
      <Suspense fallback={<div>Loading..</div>}>
      <EventsManager events={space.events} categories={categories} spaceName={params.spaceName} />
      </Suspense>
    </section>
  );
}

export default Page;
