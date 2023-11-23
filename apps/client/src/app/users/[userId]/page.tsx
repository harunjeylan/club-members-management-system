import Header2 from '@client/components/ui/Header2';
import getUserDetails from '@client/libs/server/getUserDetails';
import { RoleScop } from '@prisma/client';
import { BiUserCircle } from 'react-icons/bi';

async function Page({ params }: { params: { userId: string } }) {
  const user = await getUserDetails(params.userId);

  return (
    <section className="w-full">
      <div className="w-full px-1 md:px-2 lg:px-4 flex flex-col gap-4 ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title={`${user.first_name} ${user.last_name}`} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full md:col-span-6 lg:col-span-4 p-4 flex flex-col gap-4  rounded-md bg-secondary-200 dark:bg-secondary-900">
            <div className="flex flex-col gap-4 mx-auto mt-auto justify-center items-center">
              <BiUserCircle size={140} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-2 px-4">
                <div className="font-thin">Full Name</div>
                <div className="font-bold">
                  {user.first_name} {user.last_name}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2 px-4">
                <div className="font-thin">Username</div>
                <div className="font-bold">{user.username}</div>
              </div>
              <div className="flex justify-between items-center gap-2 px-4">
                <div className="font-thin">Username</div>
                <div className="font-bold">{user.username}</div>
              </div>
            </div>
          </div>
          
          <div className="col-span-full  md:col-span-6 lg:col-span-8 p-4 flex flex-col gap-4  rounded-md bg-secondary-200 dark:bg-secondary-900">
            <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
              <Header2 title={`User Roles`} />
            </div>
            <div className="flex flex-col">
              <table className="border-collapse  text-left text-sm ">
                <thead className="">
                  <tr>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Code
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Scop
                    </th>
                    <th scope="col" className="px-4 py-2 font-bold text-lg">
                      Space
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-400 dark:divide-slate-800 border-t border-slate-400 dark:border-slate-800">
                  {user.roles?.map((role) => (
                    <tr
                      key={role.id}
                      className="hover:bg-secondary-400 dark:hover:bg-secondary-800"
                    >
                      <td className="px-4 py-2">{role.name}</td>
                      <td className="px-4 py-2">{role.code}</td>
                      <td className="px-4 py-2">{role.scop}</td>
                      <td className="px-4 py-2">
                        {role.scop === RoleScop.SUPER ? 'For All Space' : role.spaceName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full h-full  flex rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="mx-auto h-80 flex items-center justify-center">
            <div className="my-auto  text-xl md:text-4xl p-8 font-bold">
              User activity. Coming Soon!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
