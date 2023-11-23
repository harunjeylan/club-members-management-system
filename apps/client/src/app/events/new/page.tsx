import RoleForm from '@client/components/Forms/CreateRoleForm';
import Header2 from '@client/components/ui/Header2';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

async function Page() {
  return (
    <section className="w-full ">
      <div className="flex justify-start">
        <Link
          href={'/admin/roles'}
          className=" py-2 px-4 flex gap-2 items-center text-primary-500"
        >
          <AiOutlineArrowLeft />
          Back
        </Link>
      </div>
      <div className="w-full px-4 mx-auto mt-4">
        <div className="w-full">
          <Header2 title="New Roles" />
        </div>

        <div className="flex w-full max-w-4xl mx-auto h-full max-h-fit my-auto p-4">
          <RoleForm />
        </div>
      </div>
    </section>
  );
}

export default Page;
