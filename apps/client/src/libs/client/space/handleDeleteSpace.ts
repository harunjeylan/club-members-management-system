import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from '../handleRevalidate';

export default async function handleDeleteSpace(spaceName: string | string[]) {
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
    if (typeof spaceName === 'string') {
      res = await axios.delete(`${server_host}/spaces/${spaceName}`, payload);
      handleRevalidate({
        'path[0]': '/spaces',
        'path[1]': `/spaces/${spaceName}`,
        'tag[0]': 'getSpaces',
        'tag[1]': `getSpaceDetails/${spaceName}`,
      });
    } else {
      res = await axios.put(
        `${server_host}/spaces`,
        { spaceNames: spaceName },
        payload
      );
      handleRevalidate({
        path: '/spaces',
        tag: 'getSpaces',
      });
    }

    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
