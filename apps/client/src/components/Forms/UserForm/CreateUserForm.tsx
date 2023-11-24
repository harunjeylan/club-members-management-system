'use client';
import { AlertMessage } from '@client/components/ui/Alert';
import handleCreateUser from '@client/libs/client/handleCreateUser';
import { Role, Space } from '@prisma/client';
import { useEffect, useState } from 'react';
import UserForm, { UserFormType } from './UserForm';
type PropsType = {
  roles?: Role[];
  spaces?: Space[];
};
export function CreateUserForm({ roles, spaces }: PropsType) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    roles: [],
    spaces: [],
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
    if (!values.password) {
      return;
    }
    const response = await handleCreateUser(
      values as UserFormType & { password: string }
    );
    if (response.user) {
      setMessage({
        type: 'success',
        summery: 'User created successfully',
        title: 'Success ',
      });
    }
    if (response?.error) {
      setMessage({
        type: 'warning',
        summery: response?.error,
        title: 'Warning ',
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
