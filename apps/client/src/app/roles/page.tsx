import Header2 from '@client/components/ui/Header2';
import getRoles from '@client/libs/server/getRoles';
import RolesManager from './RolesManager';

async function Page() {
  const roles = await getRoles();
  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full border-b border-secondary-500  my-4 pb-2">
          <Header2 title="Roles" />
        </div>
        <RolesManager roles={roles} />
      </div>
    </section>
  );
}

export default Page;
