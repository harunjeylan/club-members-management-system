'use client';
import handleCreateSpace from '@client/libs/client/handleCreateSpace';
import { Space } from '@prisma/client';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { AlertMessage } from '../../ui/Alert';
import SpaceForm from './SpaceForm';
function CreateSpaceForm() {
  const [message, setMessage] = useState<AlertMessage>();
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
      if (message) {
        setMessage(undefined);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  async function onSubmit(values: Partial<Space>) {
    console.log({ values });

    const response = await handleCreateSpace(values);
    console.log({ response });
    if (response.space) {
      setMessage({
        type: 'success',
        summery: 'Space created successfully',
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
    <SpaceForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
    />
  );
}

export default CreateSpaceForm;