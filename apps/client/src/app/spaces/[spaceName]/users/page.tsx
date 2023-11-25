import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import UsersManager from './UsersManager';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  return (
    <section className="w-full ">
      <UsersManager roles={space.roles} users={space.users} spaceName={params.spaceName} />
    </section>
  );
}

export default Page;
