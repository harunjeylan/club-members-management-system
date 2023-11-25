'use client';

import { AlertMessage } from '@client/components/ui/Alert';
import handleUpdateUser from '@client/libs/client/handleUpdateUser';
import { Role, Space } from '@prisma/client';
import { useEffect, useState } from 'react';
import { UserWithProfileAndRoles } from 'types/user';
import UserForm, { UserFormType } from './UserForm';

type PropsType = {
  user: Partial<UserWithProfileAndRoles & { spaces: Space[] }>;
  roles?: Role[];
  spaces?: Space[];
  spaceName?: string;
};

export default function UpdateUserForm({
  user,
  roles,
  spaces,
  spaceName,
}: PropsType) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: UserFormType = {
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
    username: user.username ?? '',
    email: user.email ?? '',
    setRoles: user.roles?.map((role) => role.id) ?? [],
    setSpaces: user.spaces?.map((role) => role.name) ?? [],
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

    const response = await handleUpdateUser(user.id, values, {
      tags: revalidateTags,
    });

    console.log(response.user);

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
  }

  return (
    <UserForm
      roles={roles}
      spaces={spaces}
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
    />
  );
}
