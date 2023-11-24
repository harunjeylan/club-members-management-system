import { CreateUserForm } from '@client/components/Forms/UserForm/CreateUserForm';
import getRoles from '@client/libs/server/getRoles';
import getSpaces from '@client/libs/server/getSpaces';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

async function Page() {
  const roles = await getRoles();
  const spaces = await getSpaces();
  return (
    <section className="w-full ">
      <div className="flex justify-start">
        <Link
          href={'/users'}
          className=" py-2 px-4 flex gap-2 items-center text-primary-500"
        >
          <AiOutlineArrowLeft />
          Back
        </Link>
      </div>
      <div className="w-full px-4 mx-auto mt-4">
        <div className="max-w-4xl mx-auto flex flex-col w-full gap-4 p-8 bg-secondary-100 dark:bg-secondary-900 rounded">
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">User Creation Form</div>
            <CreateUserForm roles={roles} spaces={spaces} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
