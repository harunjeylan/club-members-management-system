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
  const [messages, setMessages] = useState<AlertMessage[]>([]);
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
      if (messages) {
        setMessages([]);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  async function onSubmit(values: EventFormType) {
    ;
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleCreateEvent(values, {
        tags: revalidateTags,
      });
      ;
      if (response.event) {
        setMessages([{
          type: 'success',
          summery: 'Event created successfully',
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
    <EventForm
      categories={categories}
      onSubmit={onSubmit}
      initialValues={initialValues}
      messages={messages}
      setMessages={setMessages}
    />
  );
}

export default CreateEventForm;
