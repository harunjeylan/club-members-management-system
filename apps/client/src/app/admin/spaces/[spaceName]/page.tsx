import SpaceList from '@client/components/Space/SpaceList';
import Header2 from '@client/components/ui/Header2';
import getSpaces from '@client/libs/server/getSpaces';
import { Suspense } from 'react';

async function Page() {
  const spaces = await getSpaces();

  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500  my-4 pb-2">
          <Header2 title="Spaces" />
        </div>
        <Suspense fallback={<div>Loading..</div>}>
          {/* <SpaceListTable spaces={spaces} /> */}
          <SpaceList spaces={spaces} />
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
