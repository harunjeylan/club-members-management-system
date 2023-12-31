import CreateRoleForm from '@client/components/Forms/RoleForm/CreateRoleForm';
import RoleForm from '@client/components/Forms/RoleForm/CreateRoleForm';
import Header2 from '@client/components/ui/Header2';

async function Page({ params }: { params: { spaceName: string } }) {
  return (
    <section className="w-full ">
      <div className="w-full px-4 mx-auto mt-4">
        <div className="w-full">
          <Header2 title="New Roles" />
        </div>

        <div className="flex w-full max-w-4xl mx-auto h-full max-h-fit my-auto p-4">
          <CreateRoleForm spaceName={params.spaceName} />
        </div>
      </div>
    </section>
  );
}

export default Page;
