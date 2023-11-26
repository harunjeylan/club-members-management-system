'use client';
import CreateSpaceForm from '@client/components/Forms/SpaceForm/CreateSpaceForm';
import UpdateSpaceForm from '@client/components/Forms/SpaceForm/UpdateSpaceForm';
import SpaceListTable from '@client/components/Tables/SpaceListTable';
import Model from '@client/components/ui/Model';
import handleDeleteSpace from '@client/libs/client/space/handleDeleteSpace';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { Suspense, useEffect, useState } from 'react';
import { UserWithAll } from 'types/user';
enum FormType {
  UPDATE_SPACE,
  CREATE_SPACE,
}
function SpacesManager({
  spaces,
  user,
}: {
  spaces: Space[];
  user: UserWithAll;
}) {
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<Space[]>([]);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );
  console.log(selected);
  const superAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
  ]);

  useEffect(() => {
    if (activeModel === FormType.CREATE_SPACE) {
      setExpandUrl('/spaces/new');
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);
  async function deleteSpaces() {
    const response = await handleDeleteSpace(
      selected.map((space) => space.name)
    );
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
      path: '/spaces',
      tag: 'getSpaces',
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
        {!!superAdminRoles.length && activeModel === FormType.CREATE_SPACE && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Create Form</div>
            <CreateSpaceForm />
          </div>
        )}
        {activeModel === FormType.UPDATE_SPACE && selected.length === 1 && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Update Space</div>
            <Suspense fallback={<div>Loading..</div>}>
              <UpdateSpaceForm space={selected[0]} />
            </Suspense>
          </div>
        )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              {!!superAdminRoles.length && (
                <button className="btn-danger py-1 px-4" onClick={deleteSpaces}>
                  delete
                </button>
              )}

              {selected.length === 1 && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.UPDATE_SPACE);
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
        {!!superAdminRoles.length && (
          <button
            onClick={() => {
              setActiveModel(FormType.CREATE_SPACE);
              setShow(true);
            }}
            className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
          >
            Add Space
          </button>
        )}
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <Suspense fallback={<div>Loading..</div>}>
          <SpaceListTable
            spaces={spaces}
            setSelected={setSelected}
            baseUrl={''}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default SpacesManager;
