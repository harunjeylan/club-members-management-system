'use client';

import AddUsersToSpaceForm from '@client/components/Forms/AddUsersToSpaceForm';
import AssignUsersRoleForm from '@client/components/Forms/AssignUsersRoleForm';
import CreateUserForm from '@client/components/Forms/UserForm/CreateUserForm';
import UpdateUserForm from '@client/components/Forms/UserForm/UpdateUserForm';
import UsersListTable from '@client/components/Tables/UserListTable';
import Model from '@client/components/ui/Model';
import handleDeleteUser from '@client/libs/client/user/handleDeleteUser';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { Suspense, useContext, useEffect, useState } from 'react';
import { UserWithAll } from 'types/user';
import { TransitionContext } from '@client/context/TransitionContext';
import useConfirmation from '@client/hooks/useConfirmation';
enum FormType {
  ASSIGN_ROLE,
  ADD_TO_SPACE,
  UPDATE_USER,
  CREATE_USER,
}
type PropsType = {
  users: UserWithAll[];
  roles: Role[];
  spaces: Space[];
  user: UserWithAll;
};
function UsersManager({ users, roles, spaces, user }: PropsType) {
  const { confirm, ConfirmComp } = useConfirmation();
  const { handleServerMutation } = useContext(TransitionContext);
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<UserWithAll[]>([]);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );
  const adminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
  ]);

  useEffect(() => {
    if (activeModel === FormType.CREATE_USER) {
      setExpandUrl('/users/new');
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  async function deleteUsers() {
    handleServerMutation(async () => {
      const response = await handleDeleteUser(selected.map((user) => user.id));
      if (response.space) {
        // setMessages({
        //   type: 'success',
        //   summery: 'Users are added to Space successfully',
        //   title: 'Success ',
        // });
      }

      if (response?.error) {
        // setMessages({
        //   type: 'error',
        //   summery: response?.error,
        //   title: 'Error ',
        // });
      }
      handleRevalidate({
        path: '/users',
        tag: 'getUsers',
      });
    });
  }
  return (
    <div>
      <ConfirmComp className="px-4" />
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
        expandUrl={expandUrl}
      >
        {activeModel === FormType.CREATE_USER && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">User Creation Form</div>
            <CreateUserForm roles={roles} spaces={spaces} user={user} />
          </div>
        )}
        {activeModel === FormType.ADD_TO_SPACE && selected.length && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Add Users to Space</div>
            <Suspense fallback={<div>Loading..</div>}>
              <AddUsersToSpaceForm
                spaces={spaces}
                users={selected.map((user) => user.id)}
              />
            </Suspense>
          </div>
        )}
        {!!adminRoles.length &&
          activeModel === FormType.ASSIGN_ROLE &&
          selected.length && (
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
              <UpdateUserForm
                updateUser={selected[0]}
                user={user}
                spaces={spaces}
                roles={roles}
              />
            </Suspense>
          </div>
        )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-danger py-1 px-4"
                onClick={() =>
                  confirm(() => deleteUsers(), {
                    title: 'Confirm to Delete',
                    summery: 'Do Yo Want to delete this?',
                  })
                }
              >
                delete
              </button>
              <button
                className="btn-success py-1 px-4"
                onClick={() => {
                  setActiveModel(FormType.ADD_TO_SPACE);
                  setShow(true);
                }}
              >
                set space
              </button>
              {!!adminRoles.length && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.ASSIGN_ROLE);
                    setShow(true);
                  }}
                >
                  set role
                </button>
              )}
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
          <UsersListTable users={users} setSelected={setSelected} baseUrl="" />
        </Suspense>
      </div>
    </div>
  );
}

export default UsersManager;
