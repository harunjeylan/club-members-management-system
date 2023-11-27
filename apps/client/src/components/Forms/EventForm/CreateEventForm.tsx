'use client';
import handleCreateEvent from '@client/libs/client/event/handleCreateEvent';
import { Category, Event, Repeat } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { AlertMessage } from '../../ui/Alert';
import EventForm, { EventFormType } from './EventForm';
import { TransitionContext } from '@client/context/TransitionContext';
type PropsType = {
  categories: Category[];
  spaceName?: string;
};
function CreateEventForm({ categories, spaceName }: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: EventFormType = {
    title: '',
    startAt: new Date().toISOString().slice(0, 16),
    endAt: new Date().toISOString().slice(0, 16),
    fullDay: false,
    repeat: Repeat.NO_REPEAT,
    published: false,
    location: '',
    description: '',
    categoryId: '',
    spaceName: spaceName ?? '',
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

  async function onSubmit(values: EventFormType) {
    console.log({ values });
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleCreateEvent(values, {
        tags: revalidateTags,
      });
      console.log({ response });
      if (response.event) {
        setMessage({
          type: 'success',
          summery: 'Event created successfully',
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
    <EventForm
      categories={categories}
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
    />
  );
}

export default CreateEventForm;
