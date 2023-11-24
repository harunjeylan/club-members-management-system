'use client';
import handleUpdateSpace from '@client/libs/client/handleUpdateSpace';
import { Space } from '@prisma/client';
import { useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import SpaceForm from './SpaceForm';
function UpdateSpaceForm({ space }: { space: Space }) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: Partial<Space> = {
    name: space.name ?? '',
    description: space.description ?? '',
    isPrivate: space.isPrivate ?? true,
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

  async function onSubmit(values: Partial<Space>) {
    console.log({ values });

    const response = await handleUpdateSpace(space.name, values);
    console.log({ response });
    if (response.space) {
      setMessage({
        type: 'success',
        summery: 'Update Space successfully',
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

export default UpdateSpaceForm;
