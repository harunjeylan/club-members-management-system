'use client';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import RoleForm, { RoleFormType } from './RoleForm';
import handleCreateRole from '@client/libs/client/role/handleCreateRole';
import { TransitionContext } from '@client/context/TransitionContext';
function CreateRoleForm({
  spaces,
  spaceName,
}: {
  spaces?: Space[];
  spaceName?: string;
}) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: RoleFormType = {
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

  async function onSubmit(values: RoleFormType) {
    ;
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleCreateRole(values, { tags: revalidateTags });
      ;
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
    });
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

export default CreateRoleForm;
