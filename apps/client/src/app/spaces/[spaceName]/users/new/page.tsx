import CreateUserForm from '@client/components/Forms/UserForm/CreateUserForm';
import Header2 from '@client/components/ui/Header2';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/auth/login');
  }
  return (
    <section className="w-full ">
      <div className="w-full px-4 mx-auto mt-4">
        <div className="w-full">
          <Header2 title="New Roles" />
        </div>

        <div className="flex w-full max-w-4xl mx-auto h-full max-h-fit my-auto p-4">
          <CreateUserForm
            user={user}
            roles={space.roles}
            spaceName={params.spaceName}
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
