import Header2 from '@client/components/ui/Header2';
import getContacts from '@client/libs/server/getContacts';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Contact, Role, RoleCode, RoleScop } from '@prisma/client';
import UserContact from './UserContact';
import AdminContacts from './AdminContacts';

async function Page() {
  const user = await getCurrentUser();
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
  }
  if (!user || !userRoles.length) {
    return <UserContact />;
  }
  const contacts = await getContacts();
  return <AdminContacts contacts={contacts} />;
}

export default Page;
