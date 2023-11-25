import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import UsersManager from './UsersManager';
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
      <UsersManager user={user} roles={space.roles} users={space.users} spaceName={params.spaceName} />
    </section>
  );
}

export default Page;
