'use client';

import CreateEventForm from '@client/components/Forms/EventForm/CreateEventForm';
import UpdateEventForm from '@client/components/Forms/EventForm/UpdateEventForm';
import EventListTable from '@client/components/Tables/EventListTable';
import Model from '@client/components/ui/Model';
import handleDeleteEvent from '@client/libs/client/event/handleDeleteEvent';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Category, Event, RoleCode, RoleScop } from '@prisma/client';
import { Suspense, useEffect, useState } from 'react';
import { UserWithAll } from 'types/user';
enum FormType {
  UPDATE_EVENT,
  CREATE_EVENT,
}
type PropsType = {
  events: (Event & { category: Category })[];
  categories: Category[];
  spaceName?: string;
  user: UserWithAll;
};
function EventsManager({ events, categories, spaceName, user }: PropsType) {
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<(Event & { category: Category })[]>(
    []
  );
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );
  const superAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
  ]);
  const spaceAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
    { scop: RoleScop.SPACE, code: RoleCode.EDITOR, spaceName: spaceName },
  ]);

  useEffect(() => {
    if (activeModel === FormType.CREATE_EVENT) {
      setExpandUrl(`/spaces/${spaceName}/events/new`);
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  async function deleteEvents() {
    const response = await handleDeleteEvent(selected.map((event) => event.id));
    if (response.space) {
      // setMessage({
      //   type: 'success',
      //   summery: 'Users are added to Space successfully',
      //   title: 'Success ',
      // });
    }

    console.log({ response });

    if (response?.error) {
      // setMessage({
      //   type: 'error',
      //   summery: response?.error,
      //   title: 'Error ',
      // });
    }
    handleRevalidate({
      path: '/events',
      tag: 'getEvents',
      'tag[1]': `getSpaceDetails/${spaceName}`,
    });
  }
  return (
    <div>
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
        expandUrl={expandUrl}
      >
        {(!!superAdminRoles.length || !!spaceAdminRoles.length) &&
          activeModel === FormType.CREATE_EVENT && (
            <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
              <div className="text-xl font-bold">Create Role Form</div>
              <CreateEventForm categories={categories} spaceName={spaceName} />
            </div>
          )}
        {(!!superAdminRoles.length || !!spaceAdminRoles.length) &&
          activeModel === FormType.UPDATE_EVENT &&
          selected.length === 1 && (
            <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
              <div className="text-xl font-bold">Update Role</div>
              <Suspense fallback={<div>Loading..</div>}>
                <UpdateEventForm
                  categories={categories}
                  event={selected[0]}
                  spaceName={spaceName}
                />
              </Suspense>
            </div>
          )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {(!!superAdminRoles.length || !!spaceAdminRoles.length) &&
          selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button className="btn-danger py-1 px-4" onClick={deleteEvents}>
                delete
              </button>

              {selected.length === 1 && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.UPDATE_EVENT);
                    setShow(true);
                  }}
                >
                  update
                </button>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
        {(!!superAdminRoles.length || !!spaceAdminRoles.length) && (
          <button
            onClick={() => {
              setActiveModel(FormType.CREATE_EVENT);
              setShow(true);
            }}
            className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
          >
            Add Event
          </button>
        )}
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <Suspense fallback={<div>Loading..</div>}>
          <EventListTable
            events={events}
            setSelected={setSelected}
            baseUrl={''}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default EventsManager;
