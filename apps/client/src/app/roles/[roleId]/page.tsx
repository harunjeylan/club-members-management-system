import getRoleDetails from '@client/libs/server/getRoleDetails';
import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { BiUserCircle } from 'react-icons/bi';
import UsersManager from './UsersManager';
import { RoleScop } from '@prisma/client';

async function Page({ params }: { params: { roleId: string } }) {
  const role = await getRoleDetails(params.roleId);
  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="p-4 flex flex-col gap-4 justify-start rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold">About</div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <span className="">Name</span>
                  <span className="font-bold">{role.name}</span>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <span className="">Code</span>
                  <span className="font-bold">{role.code}</span>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <span className="">Scop</span>
                  <span className="font-bold">
                    {role.scop === RoleScop.SUPER
                      ? 'For All Space'
                      : role.spaceName}
                  </span>
                </div>
              </li>
            </ul>
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
