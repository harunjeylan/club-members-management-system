import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleDeleteBlog(blogId: string | string[]) {
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
    if (typeof blogId === 'string') {
      res = await axios.delete(`${server_host}/blogs/${blogId}`, payload);
      handleRevalidate({
        'path[0]': '/blogs',
        'tag[0]': 'getBlogs',
        'tag[1]': 'getPublishedBlogs',
      });
    } else {
      res = await axios.put(`${server_host}/blogs`, { blogIds: blogId }, payload);
      handleRevalidate({
        path: '/blogs',
        tag: 'getBlogs',
      });
    }

    return res.data;
  } catch (error: any) {
    ;

    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
