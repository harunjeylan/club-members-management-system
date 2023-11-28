'use client';
import { Space } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { AlertMessage } from '../../ui/Alert';
import SpaceForm from './SpaceForm';
import handleCreateSpace from '@client/libs/client/space/handleCreateSpace';
import { TransitionContext } from '@client/context/TransitionContext';
function CreateSpaceForm() {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const initialValues: Partial<Space> = {
    name: '',
    description: '',
    isPrivate: true,
  };
  let yupSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    isPrivate: yup.boolean().required(),
  });
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
    ;
    handleServerMutation(async () => {
      const response = await handleCreateSpace(values);
      ;
      if (response.space) {
        setMessages([{
          type: 'success',
          summery: 'Space created successfully',
          title: 'Success ',
        }]);
      }
      if (response?.errors) {
      setMessages(
        response?.errors.map((error: { message: string, path:string[] }) => ({
          type: 'warning',
          summery: `${error.path?.[0]} : ${error.message}`,
          title: 'Warning ',
        }))
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

export default CreateSpaceForm;
