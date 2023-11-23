import CreateUserForm from '@client/components/Forms/CreateUserForm';
import Header2 from '@client/components/ui/Header2';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

async function Page() {
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
            <CreateUserForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;