'use client';
import handleCreateEvent from '@client/libs/client/handleCreateEvent';
import { Category, Event, Repeat } from '@prisma/client';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { AlertMessage } from '../../ui/Alert';
import EventForm from './EventForm';
type PropsType = {
  categories: Category[];
};
function CreateEventForm({ categories }: PropsType) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: Partial<Event> = {
    title: '',
    startAt: new Date(),
    endAt: new Date(),
    fullDay: false,
    repeat: Repeat.NO_REPEAT,
    published: false,
    location: '',
    description: '',
    categoryId: '',
  };
  let yupSchema = yup.object({
    title: yup.string().required(),
    repeat: yup
      .string()
      .equals([
        Repeat.NO_REPEAT,
        Repeat.EVERY_DAY,
        Repeat.EVERY_WEEK,
        Repeat.EVERY_MONTH,
        Repeat.EVERY_YEAR,
      ])
      .required(),
    startAt: yup.date().required(),
    endAt: yup.date().required(),
    fullDay: yup.boolean().required(),
    published: yup.boolean().required(),
    description: yup.string(),
    location: yup.string(),
    categoryId: yup.string(),
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

  async function onSubmit(values: Partial<Event>) {
    console.log({ values });

    const response = await handleCreateEvent(values);
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
