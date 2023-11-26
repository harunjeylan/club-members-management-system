import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from '../handleRevalidate';

export default async function handleDeleteUser(userId: string | string[]) {
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
    if (typeof userId === 'string') {
      res = await axios.delete(`${host}/users/${userId}`, payload);
      handleRevalidate({
        'path[0]': '/users',
        'path[1]': `/users/${userId}`,
        'path[2]': '/spaces',
        'path[3]': '/roles',

        'tag[0]': 'getUsers',
        'tag[1]': `getUserDetails/${userId}`,
      });
    } else {
      res = await axios.put(`${host}/users`, { userIds: userId }, payload);
      handleRevalidate({
        path: '/users',
        tag: 'getUsers',
      });
    }
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
