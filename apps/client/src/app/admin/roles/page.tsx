import RoleListTable from '@client/components/Tables/RoleListTable';
import Header2 from '@client/components/ui/Header2';
import getRoles from '@client/libs/server/getRoles';
import Link from 'next/link';

async function Page() {
  const roles = await getRoles();
  return (
    <section className="w-full ">
      <div className="w-full px-4 mx-full ">
        <div className="flex justify-between w-full ">
          <Header2 title="Roles" />
          <Link href={'/admin/roles/new'} className="btn-primary py-2 px-4">
            Add Role
          </Link>
        </div>
        <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
          <RoleListTable roles={roles} />
        </div>
      </div>
    </section>
  );
}

export default Page;
