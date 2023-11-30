import Header2 from '@client/components/ui/Header2';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import getForums from '@client/libs/server/getForums';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import { redirect } from 'next/navigation';
import ForumsManager from './ForumsManager';
import getSpaces from '@client/libs/server/getSpaces';

async function Page() {

  const spaces = await getSpaces();
  const forums = await getForums();
  return (
    <section className="w-full mt-12">
      <div className="w-full px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title="Forums" />
        </div>
        <ForumsManager forums={forums} spaces={spaces} />
      </div>
    </section>
  );
}

export default Page;
