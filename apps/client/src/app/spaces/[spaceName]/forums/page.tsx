import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { Suspense } from 'react';
import BlogsManager from './BlogsManager';
import getCategories from '@client/libs/server/getCategories';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  const categories = await getCategories();
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/auth/login');
  }

  return (
    <section className="w-full ">
      <Suspense fallback={<div>Loading..</div>}>
        <BlogsManager
          user={user}
          blogs={space.blogs}
          categories={categories}
          spaceName={params.spaceName}
        />
      </Suspense>
    </section>
  );
}

export default Page;
