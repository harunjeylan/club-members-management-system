'use client';
import handleCreateRole from '@client/libs/client/handleCreateRole';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import RoleForm from './RoleForm';
function CreateRoleForm({
  spaces,
  spaceName,
}: {
  spaces?: Space[];
  spaceName?: string;
}) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: Partial<Role> = {
    name: '',
    scop: RoleScop.SPACE,
    code: RoleCode.MEMBER,
    description: '',
    spaceName: spaceName ?? spaces?.[0]?.name ?? '',
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

  async function onSubmit(values: Partial<Role>) {
    console.log({ values });

    const response = await handleCreateRole(values);
    console.log({ response });
    if (response.role) {
      setMessage({
        type: 'success',
        summery: 'Role created successfully',
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
    <RoleForm
      spaces={spaces ?? []}
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
    />
  );
}

export default CreateRoleForm;
