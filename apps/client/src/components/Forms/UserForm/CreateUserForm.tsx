'use client';
import { AlertMessage } from '@client/components/ui/Alert';
import handleCreateUser from '@client/libs/client/user/handleCreateUser';
import { Role, Space } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import UserForm, { UserFormType } from './UserForm';
import { UserWithAll } from 'types/user';
import { TransitionContext } from '@client/context/TransitionContext';
type PropsType = {
  roles?: Role[];
  spaces?: Space[];
  spaceName?: string;
  user: UserWithAll;
};
export default function CreateUserForm({
  user,
  roles,
  spaces,
  spaceName,
}: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: UserFormType = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    addRoles: [],
    addSpaces: spaceName ? [spaceName] : [],
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

    const revalidateTags = [
      ...(values.addRoles?.map((spaceName) => `getSpaceDetails/${spaceName}`) ??
        []),
      ...(values.addSpaces?.map((roleId) => `getRoleDetails/${roleId}`) ?? []),
      ...(spaceName ? [`getSpaceDetails/${spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleCreateUser(
        values as UserFormType & { password: string },
        {
          tags: revalidateTags,
        }
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
