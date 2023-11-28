'use client';

import { AlertMessage } from '@client/components/ui/Alert';
import handleUpdateUser from '@client/libs/client/user/handleUpdateUser';
import { Role, Space, User } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { UserWithAll } from 'types/user';
import UserForm, { UserFormType } from './UserForm';
import { TransitionContext } from '@client/context/TransitionContext';

type PropsType = {
  user: UserWithAll;
  roles?: Role[];
  spaces?: Space[];
  spaceName?: string;
  updateUser: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password?: string | undefined;
    roles?: Role[] | undefined;
    spaces?: Space[] | undefined;
  };
};

export default function UpdateUserForm({
  user,
  roles,
  spaces,
  spaceName,
  updateUser,
}: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: UserFormType = {
    first_name: updateUser.first_name ?? '',
    last_name: updateUser.last_name ?? '',
    username: updateUser.username ?? '',
    email: updateUser.email ?? '',
    setRoles: updateUser.roles?.map((role) => role.id) ?? [],
    setSpaces: updateUser.spaces?.map((role) => role.name) ?? [],
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (message) {
        setMessage(undefined);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  async function onSubmit(values: UserFormType) {
    if (!user.id) {
      return setMessage({
        type: 'warning',
        summery: 'User Id Not Found',
        title: 'Warning ',
      });
    }

    const revalidateTags = [
      ...(values.setSpaces?.map(
        (spaceName) => `getSpaceDetails/${spaceName}`
      ) ?? []),
      ...(values.setRoles?.map((roleId) => `getRoleDetails/${roleId}`) ?? []),
      ...(spaceName ? [`getSpaceDetails/${spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleUpdateUser(user.id, values, {
        tags: revalidateTags,
      });

      ;

      if (response.user) {
        setMessage({
          type: 'success',
          summery: 'User updated successfully',
          title: 'Success ',
        });
      }
      if (response?.error) {
        setMessage({
          type: 'error',
          summery: response?.error,
          title: 'Error ',
        });
      }
    });
  }

  return (
    <UserForm
      user={user}
      roles={roles}
      spaces={spaces}
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
      spaceName={spaceName}
    />
  );
}
