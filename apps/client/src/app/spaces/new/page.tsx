import CreateSpaceForm from '@client/components/Forms/CreateSpaceForm';
import Header2 from '@client/components/ui/Header2';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

async function Page() {
  return (
    <section className="w-full ">
      <div className="flex justify-start">
        <Link
          href={'/roles'}
          className=" py-2 px-4 flex gap-2 items-center text-primary-500"
        >
          <AiOutlineArrowLeft />
          Back
        </Link>
      </div>
      <div className="w-full px-4 mx-auto mt-4">
        

        <div className="flex w-full max-w-5xl mx-auto h-full max-h-fit my-auto p-8 bg-secondary-100 dark:bg-secondary-900 rounded">
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Create Form</div>
            <CreateSpaceForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
