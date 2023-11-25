import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import formatDateTime from '@client/utils/formatDateTime';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { BiUserCircle } from 'react-icons/bi';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  return (
    <section className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-12   gap-4">
        <div className="col-span-full  md:col-span-6  p-4 flex flex-col gap-4 justify-start rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-2 max-w-lg">
            <div className="flex justify-between items-center gap-2 px-4">
              <div className="font-thin">Name</div>
              <div className="font-bold">{space.name}</div>
            </div>
            <div className="flex justify-between items-center gap-2 px-4">
              <div className="font-thin">Created At</div>
              <div className="font-bold">{formatDateTime(space.createdAt)}</div>
            </div>
            <div className="flex justify-between items-center gap-2 px-4">
              <div className="font-thin">disc</div>
              <div className="font-bold">{space.description}</div>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {space.users.length}
              </div>
              <div className="text-2xl font-extrabold">Members</div>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">
                {space.events.length}
              </div>
              <div className="text-2xl font-extrabold">Events</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex rounded-md bg-secondary-200 dark:bg-secondary-900">
        <div className="mx-auto h-80 flex items-center justify-center">
          <div className="my-auto  font-bold  text-xl md:text-4xl p-8">
            Manage Your Club Members
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
