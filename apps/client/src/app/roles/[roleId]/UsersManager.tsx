'use client';

import UsersListTable from '@client/components/Tables/UserListTable';
import handleUpdateRole from '@client/libs/client/role/handleUpdateRole';
import { User } from '@prisma/client';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import { UserWithAll } from 'types/user';
enum FormType {
  ASSIGN_ROLE,
  ADD_TO_SPACE,
  UPDATE_USER,
  CREATE_USER,
}
type PropsType = {
  users: User[];
  roleId: string;
};
function UsersManager({ users, roleId }: PropsType) {
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<User[]>([]);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );
  ;

  useEffect(() => {
    if (activeModel === FormType.CREATE_USER) {
      setExpandUrl('/admin/users/new');
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  async function removeUsersFromSpace() {
    const response = await handleUpdateRole(roleId, {
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
  }

  return (
    <div>
      <div className="flex justify-between w-full px-4">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-warning py-1 px-4"
                onClick={() => removeUsersFromSpace()}
              >
                remove user
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
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
