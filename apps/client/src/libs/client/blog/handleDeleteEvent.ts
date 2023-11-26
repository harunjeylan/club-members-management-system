import { host } from '@client/config/host.config';
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
      res = await axios.delete(`${host}/blogs/${blogId}`, payload);
      handleRevalidate({
        'path[0]': '/blogs',
        'path[1]': `/blogs/${blogId}`,
        'tag[0]': 'getBlogs',
        'tag[1]': `getBlogDetails/${blogId}`,
      });
    } else {
      res = await axios.put(`${host}/blogs`, { blogIds: blogId }, payload);
      handleRevalidate({
        path: '/blogs',
        tag: 'getBlogs',
      });
    }

    return res.data;
  } catch (error: any) {
    console.log(error);

    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
