import FileCard from '@client/components/File/FileCard';
import UploadFiles from '@client/components/File/UploadFiles';
import Header2 from '@client/components/ui/Header2';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import getFiles from '@client/libs/server/getFiles';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import UploadFileBtn from './UploadFileBtn';

async function Page() {
  const files = await getFiles();
  const user = await getCurrentUser();
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
  }
  ;

  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full border-b border-secondary-500  my-4 pb-2">
          <Header2 title="Fils" />
        </div>
        <div className="flex justify-between w-full mb-4">
          <div></div>
          {!!userRoles.length && <UploadFileBtn />}
        </div>
        <div className="w-full grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, ind) => (
            <FileCard key={ind} file={file} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page;
