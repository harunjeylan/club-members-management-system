import CreateEventForm from '@client/components/Forms/EventForm/CreateEventForm';
import RoleForm from '@client/components/Forms/RoleForm/CreateRoleForm';
import Header2 from '@client/components/ui/Header2';
import getCategories from '@client/libs/server/getCategories';

async function Page({ params }: { params: { spaceName: string } }) {
  const categories = await getCategories();
  return (
    <section className="w-full ">
      <div className="w-full px-4 mx-auto mt-4">
        <div className="w-full">
          <Header2 title="New Roles" />
        </div>

        <div className="flex w-full max-w-4xl mx-auto h-full max-h-fit my-auto p-4">
          <CreateEventForm
            categories={categories}
            spaceName={params.spaceName}
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
