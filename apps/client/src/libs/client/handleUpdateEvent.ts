import { host } from '@client/config/host.config';
import { Event, Repeat } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from './handleRevalidate';
import getFieldsData from '@libs/utils/getFieldsData';

export default async function handleUpdateEvent(
  eventId: string,
  values: {
    title?: string;
    startAt?: string;
    endAt?: string;
    fullDay?: boolean;
    repeat?: Repeat;
    published?: boolean;
    isPrivate?: boolean;
    location?: string | null;
    description?: string | null;
    categoryId?: string | null;
    spaceName?: string | null;
    fileModelId?: string | null;
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const url = `${host}/events/${eventId}`;

    if (typeof token === 'undefined') {
      return;
    }
    const fields = [
      'title',
      'startAt',
      'endAt',
      'fullDay',
      'repeat',
      'published',
      'isPrivate',
      'location',
      'description',
      'categoryId',
      'spaceName',
      'fileModelId',
    ];
    const payloadData = getFieldsData(values, fields);
    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(url, payloadData, payload);
    const revalidate: any = {
      'path[0]': '/events',
      'path[1]': `/events/${eventId}`,
      'path[3]': `/spaces/events/${values.spaceName}`,
      'tag[0]': 'getEvents',
      'tag[1]': `getEventDetails/${eventId}`,
      'tag[3]': `getSpaceDetails/${values.spaceName}`,
    };
    revalidateOptions?.tags?.forEach((tag, ind) => {
      revalidate['tag[' + (6 + ind) + ']'] = tag;
    });
    revalidateOptions?.paths?.forEach((path, ind) => {
      revalidate['path[' + (6 + ind) + ']'] = path;
    });
    handleRevalidate(revalidate);
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
