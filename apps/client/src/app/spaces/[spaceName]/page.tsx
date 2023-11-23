import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import { BiUserCircle } from 'react-icons/bi';

async function Page({ params }: { params: { spaceName: string } }) {
  const space = await getSpaceDetails(params.spaceName);
  return (
    <section className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12   gap-4">
        <div className="col-span-3 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">5</div>
              <div className="text-2xl font-extrabold">Members</div>
            </div>
          </div>
        </div>

        <div className="col-span-3 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">5</div>
              <div className="text-2xl font-extrabold">Admins</div>
            </div>
          </div>
        </div>

        <div className="col-span-3 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">5</div>
              <div className="text-2xl font-extrabold">Editors</div>
            </div>
          </div>
        </div>

        <div className="col-span-3 rounded-md bg-secondary-200 dark:bg-secondary-900">
          <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
            <BiUserCircle size={80} />
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold">5</div>
              <div className="text-2xl font-extrabold">Events</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex rounded-md bg-secondary-200 dark:bg-secondary-900">
        <div className="mx-auto h-80 flex items-center justify-center">
          <div className="my-auto  font-bold  text-xl md:text-4xl p-8">Manage Your Club Members</div>
        </div>
      </div>
    </section>
  );
}

export default Page;
