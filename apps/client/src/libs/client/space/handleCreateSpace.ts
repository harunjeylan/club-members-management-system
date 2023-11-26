import { getCookie } from 'cookies-next';
import { host } from '@client/config/host.config';
import { Role, Space } from '@prisma/client';
import axios from 'axios';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from '../handleRevalidate';

export default async function handleCreateSpace(values: Partial<Space>) {
  try {
    const token = getCookie('token');
    const url = `${host}/spaces`;
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
    const res = await axios.post(url, payloadData, payload);
    handleRevalidate({
      path: '/spaces',
      tag: 'getSpaces',
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
