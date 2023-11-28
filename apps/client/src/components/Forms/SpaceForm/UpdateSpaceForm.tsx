'use client';
import { Space } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import SpaceForm from './SpaceForm';
import handleUpdateSpace from '@client/libs/client/space/handleUpdateSpace';
import { TransitionContext } from '@client/context/TransitionContext';
function UpdateSpaceForm({ space }: { space: Space }) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const initialValues: Partial<Space> = {
    name: space.name ?? '',
    description: space.description ?? '',
    isPrivate: space.isPrivate ?? true,
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

  async function onSubmit(values: Partial<Space>) {
    handleServerMutation(async () => {
      const response = await handleUpdateSpace(space.name, values);
      if (response.space) {
        setMessages([{
          type: 'success',
          summery: 'Update Space successfully',
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
    <SpaceForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      messages={messages}
      setMessages={setMessages}
    />
  );
}

export default UpdateSpaceForm;
