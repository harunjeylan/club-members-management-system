'use client';
import { Role, RoleCode, RoleScop, Space } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import RoleForm, { RoleFormType } from './RoleForm';
import handleUpdateRole from '@client/libs/client/role/handleUpdateRole';
import { TransitionContext } from '@client/context/TransitionContext';
function UpdateRoleForm({
  role,
  spaces,
  spaceName,
}: {
  role: Role;
  spaces?: Space[];
  spaceName?: string;
}) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const initialValues: RoleFormType = {
    name: role.name ?? '',
    scop: role.scop ?? RoleScop.SPACE,
    code: role.code ?? RoleCode.MEMBER,
    description: role.description ?? '',
    spaceName: role.spaceName ?? spaceName ?? '',
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messages) {
        setMessages([]);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  async function onSubmit(values: RoleFormType) {
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleUpdateRole(role.id, values, {
        tags: revalidateTags,
      });

      if (response.role) {
        setMessages([{
          type: 'success',
          summery: 'Role created successfully',
          title: 'Success ',
        }]);
      }
      if (response?.errors) {
        setMessages(
          response?.errors.map(
            (error: { message: string; path: string[] }) => ({
              type: 'warning',
              summery: `${error.path?.[0]} : ${error.message}`,
              title: 'Warning ',
            })
          )
        );
      }
    });
  }
  return (
    <RoleForm
      spaces={spaces}
      onSubmit={onSubmit}
      initialValues={initialValues}
      messages={messages}
      setMessages={setMessages}
    />
  );
}

export default UpdateRoleForm;
