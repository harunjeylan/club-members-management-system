'use client';

import AssignUsersRoleForm from '@client/components/Forms/AssignUsersRoleForm';
import CreateUserForm from '@client/components/Forms/CreateUserForm';
import UpdateUserForm from '@client/components/Forms/UserForm/UserForm';
import UsersListTable from '@client/components/Tables/UserListTable';
import Model from '@client/components/ui/Model';
import handleAddUsersToSpace from '@client/libs/client/handleAddUsersToSpace';
import handleRemoveUsersFromSpace from '@client/libs/client/handleRemoveUsersFromSpace';
import { Role } from '@prisma/client';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import { UserWithAll, UserWithProfileAndRoles } from 'types/user';
enum FormType {
  ASSIGN_ROLE,
  ADD_TO_SPACE,
  UPDATE_USER,
  CREATE_USER,
}
type PropsType = {
  users: UserWithProfileAndRoles[];
  roles: Role[];
  spaceName: string;
};
function UsersManager({ users, roles, spaceName }: PropsType) {
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<UserWithProfileAndRoles[]>([]);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );
  console.log(selected);

  useEffect(() => {
    if (activeModel === FormType.CREATE_USER) {
      setExpandUrl('/admin/users/new');
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  async function removeUsersFromSpace() {
    const response = await handleRemoveUsersFromSpace(
      spaceName,
      selected.map((user) => user.id)
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
  }

  return (
    <div>
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
        expandUrl={expandUrl}
      >
        {activeModel === FormType.CREATE_USER && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">User Creation Form</div>
            <CreateUserForm />
          </div>
        )}

        {activeModel === FormType.ASSIGN_ROLE && selected.length && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Assign Role to Users</div>
            <Suspense fallback={<div>Loading..</div>}>
              <AssignUsersRoleForm
                roles={roles}
                users={selected.map((user) => user.id)}
              />
            </Suspense>
          </div>
        )}
        {activeModel === FormType.UPDATE_USER && selected.length === 1 && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Assign Role to Users</div>
            <Suspense fallback={<div>Loading..</div>}>
              <UpdateUserForm user={selected[0]} roles={roles} />
            </Suspense>
          </div>
        )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button className="btn-danger py-1 px-4">delete</button>
              <button
                className="btn-warning py-1 px-4"
                onClick={() => removeUsersFromSpace()}
              >
                remove from space
              </button>
              <button
                className="btn-success py-1 px-4"
                onClick={() => {
                  setActiveModel(FormType.ASSIGN_ROLE);
                  setShow(true);
                }}
              >
                role
              </button>
              {selected.length === 1 && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.UPDATE_USER);
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
            setActiveModel(FormType.CREATE_USER);
            setShow(true);
          }}
          className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
        >
          Add User
        </button>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <Suspense fallback={<div>Loading..</div>}>
          <UsersListTable
            users={users}
            setSelected={setSelected as Dispatch<SetStateAction<UserWithAll[]>>}
            baseUrl={``}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default UsersManager;
