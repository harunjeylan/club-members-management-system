import { getCookie } from 'cookies-next';
import { host } from '@client/config/host.config';
import { Role, Space } from '@prisma/client';
import axios from 'axios';

export default async function handleUpdateSpace(spaceName:string,values: Partial<Space>) {
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
    return res.data;
  } catch (error) {
    //@ts-ignore
    return { error: error?.response?.data?.message ?? 'Unknown Error' };
  }
}
