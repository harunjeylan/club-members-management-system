'use client';
import handleUpdateEvent from '@client/libs/client/event/handleUpdateEvent';
import { Category, Event, Repeat } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import EventForm, { EventFormType } from './EventForm';
import { TransitionContext } from '@client/context/TransitionContext';
function UpdateEventForm({
  event,
  categories,
  spaceName,
}: {
  event: Event;
  categories: Category[];
  spaceName?: string;
}) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: EventFormType = {
    title: event.title ?? '',
    startAt:
      event.startAt instanceof Date
        ? event.startAt.toISOString().slice(0, 16)
        : new Date(event.startAt).toISOString().slice(0, 16),
    endAt:
      event.endAt instanceof Date
        ? event.endAt.toISOString().slice(0, 16)
        : new Date(event.startAt).toISOString().slice(0, 16),
    fullDay: event.fullDay ?? false,
    repeat: event.repeat ?? Repeat.NO_REPEAT,
    published: event.published ?? false,
    location: event.location ?? '',
    description: event.description ?? '',
    categoryId: event.categoryId ?? '',
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
    ;
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleUpdateEvent(event.id, values, {
        tags: revalidateTags,
      });
      ;
      if (response.event) {
        setMessage({
          type: 'success',
          summery: 'Event created successfully',
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

export default UpdateEventForm;
