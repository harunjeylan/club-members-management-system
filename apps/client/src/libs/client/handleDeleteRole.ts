import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export default async function handleDeleteRole(roleId: string | string[]) {
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
    if (roleId === 'string') {
      res = await axios.delete(`${host}/roles/${roleId}`, payload);
    } else {
      res = await axios.put(`${host}/roles`, { roleIds: roleId }, payload);
    }
    return res.data;
  } catch (error) {
    //@ts-ignore
    return { error: error?.response?.data?.message ?? 'Unknown Error' };
  }
}
