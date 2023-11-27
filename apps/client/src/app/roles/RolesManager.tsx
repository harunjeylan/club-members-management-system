'use client';

import CreateRoleForm from '@client/components/Forms/RoleForm/CreateRoleForm';
import UpdateRoleForm from '@client/components/Forms/RoleForm/UpdateRoleForm';
import RoleListTable from '@client/components/Tables/RoleListTable';
import Model from '@client/components/ui/Model';
import handleDeleteRole from '@client/libs/client/role/handleDeleteRole';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { Role, Space } from '@prisma/client';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { TransitionContext } from '@client/context/TransitionContext';
enum FormType {
  UPDATE_ROLE,
  CREATE_ROLE,
}
type PropsType = {
  roles: Role[];
  spaces: Space[];
};
function RolesManager({ roles, spaces }: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<Role[]>([]);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );
  console.log(selected);

  useEffect(() => {
    if (activeModel === FormType.CREATE_ROLE) {
      setExpandUrl('/roles/new');
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  async function deleteRoles() {
    handleServerMutation(async () => {
      const response = await handleDeleteRole(selected.map((role) => role.id));
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
        path: '/roles',
        tag: 'getRoles',
      });
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
        {activeModel === FormType.CREATE_ROLE && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Create Role Form</div>
            <CreateRoleForm spaces={spaces} />
          </div>
        )}
        {activeModel === FormType.UPDATE_ROLE && selected.length === 1 && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Update Role</div>
            <Suspense fallback={<div>Loading..</div>}>
              <UpdateRoleForm spaces={spaces} role={selected[0]} />
            </Suspense>
          </div>
        )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button className="btn-danger py-1 px-4" onClick={deleteRoles}>
                delete
              </button>

              {selected.length === 1 && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.UPDATE_ROLE);
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

        <button
          onClick={() => {
            setActiveModel(FormType.CREATE_ROLE);
            setShow(true);
          }}
          className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
        >
          Add Role
        </button>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <Suspense fallback={<div>Loading..</div>}>
          <RoleListTable roles={roles} setSelected={setSelected} baseUrl={''} />
        </Suspense>
      </div>
    </div>
  );
}

export default RolesManager;
