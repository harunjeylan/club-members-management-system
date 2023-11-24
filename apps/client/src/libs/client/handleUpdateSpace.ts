import { getCookie } from 'cookies-next';
import { host } from '@client/config/host.config';
import { Role, Space } from '@prisma/client';
import axios from 'axios';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from './handleRevalidate';

export default async function handleUpdateSpace(
  spaceName: string,
  values: Partial<Space>
) {
  try {
    const token = getCookie('token');
    const url = `${host}/spaces/${spaceName}`;
    const payloadData = {
      name: values.name,
      description: values.description,
      isPrivate: values.isPrivate,
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
      'path[0]': '/spaces',
      'path[1]': `/spaces/${spaceName}`,
      'tag[0]': 'getSpaces',
      'tag[1]': `getSpaceDetails/${spaceName}`,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
