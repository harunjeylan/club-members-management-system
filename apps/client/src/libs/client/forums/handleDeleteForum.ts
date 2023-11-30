import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleDeleteForum(forumId: string | string[]) {
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
    if (typeof forumId === 'string') {
      res = await axios.delete(`${server_host}/forums/${forumId}`, payload);
      handleRevalidate({
        'path[0]': '/forums',
        'tag[0]': 'getForums',
        'tag[1]': 'getPublishedForums',
      });
    } else {
      res = await axios.put(`${server_host}/forums`, { forumIds: forumId }, payload);
      handleRevalidate({
        path: '/forums',
        tag: 'getForums',
      });
    }

    return res.data;
  } catch (error: any) {
    ;

    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
