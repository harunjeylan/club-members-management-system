import { getCookie } from 'cookies-next';
import { host } from '@client/config/host.config';
import { Role } from '@prisma/client';
import axios from 'axios';

export default async function handleCreateRole(values: Partial<Role>) {
  try {
    const token = getCookie('token');
    const url = `${host}/roles`;
    const payloadData = {
      name: values.name,
      description: values.description,
      code: values.code,
      scop: values.scop,
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
