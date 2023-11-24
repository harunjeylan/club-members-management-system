import { getCookie } from 'cookies-next';
import { host } from '@client/config/host.config';
import { Event } from '@prisma/client';
import axios from 'axios';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from './handleRevalidate';

export default async function handleCreateEvent(values: Partial<Event>) {
  try {
    const token = getCookie('token');
    const url = `${host}/events`;
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
    const res = await axios.post(url, payloadData, payload);

    handleRevalidate({
      path: '/events',
      tag: 'getEvents',
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
