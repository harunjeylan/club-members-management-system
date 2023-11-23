import getRoleDetails from '@client/libs/server/getRoleDetails';
import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { BiUserCircle } from 'react-icons/bi';
import UsersManager from './UsersManager';
import { RoleScop } from '@prisma/client';

async function Page({ params }: { params: { roleId: string } }) {
  const role = await getRoleDetails(params.roleId);
  console.log(role);

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="p-4 flex flex-col gap-4 justify-start rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-2 max-w-lg">
            <div className="flex justify-between items-center gap-2 px-4">
              <div className="font-thin">Name</div>
              <div className="font-bold">{role.name}</div>
            </div>
            <div className="flex justify-between items-center gap-2 px-4">
              <div className="font-thin">Code</div>
              <div className="font-bold">{role.code}</div>
            </div>
            <div className="flex justify-between items-center gap-2 px-4">
              <div className="font-thin">Scop</div>
              <div className="font-bold">{role.scop}</div>
            </div>
            <div className="flex justify-between items-center gap-2 px-4">
              <div className="font-thin">Scop</div>
              <div className="font-bold">
                {role.scop === RoleScop.SUPER
                  ? 'For All Space'
                  : role.spaceName}
              </div>
            </div>
          </div>
        </div>
        <div className=" rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="text-2xl px-4 py-2">Users</div>
          <UsersManager users={role?.users} roleId={params.roleId} />
        </div>
      </div>
    </section>
  );
}

export default Page;
