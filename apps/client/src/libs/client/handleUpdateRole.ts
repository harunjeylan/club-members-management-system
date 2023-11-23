import { getCookie } from 'cookies-next';
import { host } from '@client/config/host.config';
import { Role } from '@prisma/client';
import axios from 'axios';

export default async function handleUpdateRole(
  roleId: string,
  values: Partial<Role>
) {
  try {
    const token = getCookie('token');
    const url = `${host}/roles/${roleId}`;
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
    const res = await axios.put(url, payloadData, payload);
    return res.data;
  } catch (error) {
    //@ts-ignore
    return { error: error?.response?.data?.message ?? 'Unknown Error' };
  }
}
