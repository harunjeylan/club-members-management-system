import Header2 from '@client/components/ui/Header2';
import getDashboard from '@client/libs/server/getDashboard';
import { BiUserCircle } from 'react-icons/bi';

export default async function SuperAdminDashboard() {
  const dashboard = await getDashboard();
  return (
    <section className="w-full flex flex-col gap-8 p-4">
      <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
        <Header2 title="Admin Dashboard" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8  gap-4">
        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">{dashboard.spaces}</div>
              <div className="text-2xl font-extrabold">Spaces</div>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">{dashboard.users}</div>
              <div className="text-2xl font-extrabold">Members</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {dashboard.superAdmins}
              </div>
              <div className="text-2xl font-extrabold">Super Admins</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {dashboard.superEditors}
              </div>
              <div className="text-2xl font-extrabold">Super Editors</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {dashboard.spaceAdmins}
              </div>
              <div className="text-2xl font-extrabold">Space Admins</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {dashboard.spaceEditors}
              </div>
              <div className="text-2xl font-extrabold">Space Editors</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {dashboard.categories}
              </div>
              <div className="text-2xl font-extrabold">Category</div>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {dashboard.spaceAdmins}
              </div>
              <div className="text-2xl font-extrabold">Events</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
