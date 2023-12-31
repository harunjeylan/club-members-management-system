import Header2 from '@client/components/ui/Header2';
import getRoles from '@client/libs/server/getRoles';
import getSpaces from '@client/libs/server/getSpaces';
import getUsers from '@client/libs/server/getUsers';
import UsersManager from './UsersManager';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { redirect } from 'next/navigation';

async function Page() {
  const users = await getUsers();
  const roles = await getRoles();
  const spaces = await getSpaces();
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/auth/login');
  }
  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title="Users" />
        </div>
        <UsersManager user={user} spaces={spaces} roles={roles} users={users} />
      </div>
    </section>
  );
}

export default Page;
