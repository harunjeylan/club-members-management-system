import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from '../handleRevalidate';

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
    if (typeof roleId === 'string') {
      res = await axios.delete(`${server_host}/roles/${roleId}`, payload);
      handleRevalidate({
        'path[0]': '/roles',
        'path[1]': `/roles/${roleId}`,
        'path[2]': '/spaces',
        'tag[0]': 'getRoles',
        'tag[1]': `getRoleDetails/${roleId}`,
      });
    } else {
      res = await axios.put(`${server_host}/roles`, { roleIds: roleId }, payload);
      handleRevalidate({
        path: '/roles',
        tag: 'getRoles',
      });
    }

    return res.data;
  } catch (error: any) {
    ;

    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
