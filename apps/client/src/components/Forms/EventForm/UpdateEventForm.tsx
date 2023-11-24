'use client';
import handleUpdateEvent from '@client/libs/client/handleUpdateEvent';
import { Category, Event, Repeat } from '@prisma/client';
import { useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import EventForm from './EventForm';
function UpdateEventForm({
  event,
  categories,
}: {
  event: Event;
  categories: Category[];
}) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: Partial<Event> = {
    title: event.title ?? '',
    startAt: new Date(event.startAt),
    endAt: new Date(event.endAt),
    fullDay: event.fullDay ?? false,
    repeat: event.repeat ?? Repeat.NO_REPEAT,
    published: event.published ?? false,
    location: event.location ?? '',
    description: event.description ?? '',
    categoryId: event.categoryId ?? '',
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

  async function onSubmit(values: Partial<Event>) {
    console.log({ values });

    const response = await handleUpdateEvent(event.id, values);
    console.log({ response });
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
