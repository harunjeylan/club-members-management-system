import { host } from '@client/config/host.config';
import { Event } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from './handleRevalidate';

export default async function handleUpdateEvent(
  eventId: string,
  values: Partial<Event>
) {
  try {
    const token = getCookie('token');
    const url = `${host}/events/${eventId}`;
    const payloadData = {
      title: values.title,
      startAt: values.startAt,
      endAt: values.endAt,
      fullDay: values.fullDay,
      repeat: values.repeat,
      location: values.location,
      description: values.description,
      categoryId: values.categoryId,
      published: values.published,
    };
    if (typeof token === 'undefined') {
      return;
    }

    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(url, payloadData, payload);

    handleRevalidate({
      'path[0]': '/events',
      'path[1]': `/roles/${eventId}`,
      'tag[0]': 'getEvents',
      'tag[1]': `getEventDetails/${eventId}`,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
