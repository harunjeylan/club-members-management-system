import Header2 from '@client/components/ui/Header2';
import getEvents from '@client/libs/server/getEvents';
import EventsManager from './EventsManager';
import getCategories from '@client/libs/server/getCategories';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { Category, Event, Role, RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getPublishedEvents from '@client/libs/server/getPublishedEvents';
import EventList from '../../components/Event/EventList';
import Footer from '@client/components/Footer';
import Header from '@client/components/ui/Header';

async function Page() {
  const user = await getCurrentUser();
  let events: (Event & { category: Category })[] = [];
  let categories: Category[] = [];
  let userRoles: Partial<Role>[] = [];
  if (user) {
    userRoles = getUserAccessRoles(user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    events = await getEvents();

    categories = await getCategories();
  } else {
    events = await getPublishedEvents();
  }
  if (!userRoles.length) {
    return (
      <>
        <section className="w-full ">
          <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
          <div className="my-4">
            <Header title="Events" />
          </div>
            <EventList events={events} />
          </div>
        </section>
        <Footer />
      </>
    );
  }
  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
          <Header2 title="Events" />
        </div>
        <EventsManager events={events} categories={categories} />
      </div>
    </section>
  );
}

export default Page;
