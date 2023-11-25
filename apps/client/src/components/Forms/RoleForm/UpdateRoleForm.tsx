'use client';
import handleUpdateRole from '@client/libs/client/handleUpdateRole';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import RoleForm, { RoleFormType } from './RoleForm';
function UpdateRoleForm({
  role,
  spaces,
  spaceName,
}: {
  role: Role;
  spaces?: Space[];
  spaceName?: string;
}) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: RoleFormType = {
    name: role.name ?? '',
    scop: role.scop ?? RoleScop.SPACE,
    code: role.code ?? RoleCode.MEMBER,
    description: role.description ?? '',
    spaceName: role.spaceName ?? spaceName ?? '',
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

  async function onSubmit(values: RoleFormType) {
    console.log({ values });

    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];

    const response = await handleUpdateRole(role.id, values, {
      tags: revalidateTags,
    });

    if (response.role) {
      setMessage({
        type: 'success',
        summery: 'Role created successfully',
        title: 'Success ',
      });
    }
    if (response?.message) {
      setMessage({
        type: 'error',
        summery: response?.message,
        title: 'Error ',
      });
    }
  }
  return (
    <RoleForm
      spaces={spaces}
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
    />
  );
}

export default UpdateRoleForm;
