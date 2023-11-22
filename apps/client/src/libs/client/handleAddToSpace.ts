import { host } from '@client/config/host.config';
import { Space } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';

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
    return res.data;
  } catch (error) {
    //@ts-ignore
    return { error: error?.response?.data?.message ?? 'Unknown Error' };
  }
}
