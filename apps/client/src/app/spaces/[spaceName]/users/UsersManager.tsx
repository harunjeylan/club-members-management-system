'use client';

import AssignUsersRoleForm from '@client/components/Forms/AssignUsersRoleForm';
import CreateUserForm from '@client/components/Forms/UserForm/CreateUserForm';
import UpdateUserForm from '@client/components/Forms/UserForm/UpdateUserForm';
import UsersListTable from '@client/components/Tables/UserListTable';
import Model from '@client/components/ui/Model';
import { TransitionContext } from '@client/context/TransitionContext';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import handleUpdateSpace from '@client/libs/client/space/handleUpdateSpace';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop, User } from '@prisma/client';
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserWithAll } from 'types/user';
enum FormType {
  ASSIGN_ROLE,
  ADD_TO_SPACE,
  UPDATE_USER,
  CREATE_USER,
}
type PropsType = {
  users: User[];
  roles: Role[];
  spaceName: string;
  user: UserWithAll;
};
function UsersManager({ users, roles, spaceName, user }: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<User[]>([]);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );

  const superAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
  ]);
  const spaceAdminRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
    { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
  ]);
  const spaceEditorRoles = getUserAccessRoles(user.roles, [
    { scop: RoleScop.SPACE, code: RoleCode.EDITOR, spaceName: spaceName },
  ]);

  useEffect(() => {
    if (activeModel === FormType.CREATE_USER) {
      setExpandUrl(`/spaces/${spaceName}/users/new`);
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  async function removeUsersFromSpace() {
    handleServerMutation(async () => {
      const response = await handleUpdateSpace(spaceName, {
        removeUsers: selected.map((user) => user.id),
      });
      if (response.space) {
        // setMessages({
        //   type: 'success',
        //   summery: 'Users are added to Space successfully',
        //   title: 'Success ',
        // });
      }

      ;

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
        'tag[1]': `getSpaceDetails/${spaceName}`,
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
        {(!!superAdminRoles.length ||
          !!spaceAdminRoles.length ||
          !!spaceEditorRoles.length) &&
          activeModel === FormType.CREATE_USER && (
            <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
              <div className="text-xl font-bold">User Creation Form</div>
              <CreateUserForm user={user} roles={roles} spaceName={spaceName} />
            </div>
          )}

        {(!!superAdminRoles.length || !!spaceAdminRoles.length) &&
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
        {(!!superAdminRoles.length ||
          !!spaceAdminRoles.length ||
          !!spaceEditorRoles.length) &&
          activeModel === FormType.UPDATE_USER &&
          selected.length === 1 && (
            <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
              <div className="text-xl font-bold">Assign Role to Users</div>
              <Suspense fallback={<div>Loading..</div>}>
                <UpdateUserForm
                  user={user}
                  updateUser={selected[0]}
                  roles={roles}
                  spaceName={spaceName}
                />
              </Suspense>
            </div>
          )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              {(!!superAdminRoles.length || !!spaceAdminRoles.length) && (
                <button className="btn-danger py-1 px-4">delete</button>
              )}
              {(!!superAdminRoles.length || !!spaceAdminRoles.length) && (
                <button
                  className="btn-warning py-1 px-4"
                  onClick={() => removeUsersFromSpace()}
                >
                  remove from space
                </button>
              )}
              {(!!superAdminRoles.length || !!spaceAdminRoles.length) && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.ASSIGN_ROLE);
                    setShow(true);
                  }}
                >
                  change role
                </button>
              )}

              {(!!superAdminRoles.length ||
                !!spaceAdminRoles.length ||
                !!spaceEditorRoles.length) &&
                selected.length === 1 && (
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
        {(!!superAdminRoles.length ||
          !!spaceAdminRoles.length ||
          !!spaceEditorRoles.length) && (
          <button
            onClick={() => {
              setActiveModel(FormType.CREATE_USER);
              setShow(true);
            }}
            className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
          >
            Add User
          </button>
        )}
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
