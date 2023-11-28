import { EventFormType } from '@client/components/Forms/EventForm/EventForm';
import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';
import { Repeat } from '@prisma/client';

export default async function handleCreateEvent(
  values: {
    title: string;
    startAt: string;
    endAt: string;
    fullDay: boolean;
    repeat: Repeat;
    published: boolean;
    location: string;
    description: string;
    categoryId: string;
    spaceName?: string;
    fileModelId?: string;
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const url = `${server_host}/events`;
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
      spaceName:values.spaceName
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
    const revalidate: any = {
      path: '/events',
      tag: 'getEvents',
      'tag[1]': `getPublishedEvents`,
    };
    revalidateOptions?.tags?.forEach((tag, ind) => {
      revalidate['tag[' + (6 + ind) + ']'] = tag;
    })
    revalidateOptions?.paths?.forEach((path, ind) => {
      revalidate['path[' + (6 + ind) + ']'] = path;
    });
    handleRevalidate(revalidate);
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
