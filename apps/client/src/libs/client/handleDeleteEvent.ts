import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from './handleRevalidate';

export default async function handleDeleteEvent(eventId: string | string[]) {
  try {
    const token = getCookie('token');
    if (typeof token === 'undefined') {
      return;
    }

    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res: any;
    if (eventId === 'string') {
      res = await axios.delete(`${host}/events/${eventId}`, payload);
      handleRevalidate({
        'path[0]': '/events',
        'path[1]': `/events/${eventId}`,
        'tag[0]': 'getEvents',
        'tag[1]': `getEventDetails/${eventId}`,
      });
    } else {
      res = await axios.put(`${host}/events`, { eventIds: eventId }, payload);
      handleRevalidate({
        path: '/events',
        tag: 'getEvents',
      });
    }

    return res.data;
  } catch (error: any) {
    console.log(error);

    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
