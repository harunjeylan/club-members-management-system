import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleDeleteCategory(categoryId: string | string[]) {
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
    ;
    
    if (typeof categoryId === 'string') {
      res = await axios.delete(`${server_host}/categories/${categoryId}`, payload);
      handleRevalidate({
        'path[0]': '/categories',
        'path[1]': `/categories/${categoryId}`,
        'tag[0]': 'getRoles',
        'tag[1]': `getRoleDetails/${categoryId}`,
      });
    } else {
      res = await axios.put(`${server_host}/categories`, { categoryIds: categoryId }, payload);
      handleRevalidate({
        path: '/categories',
        tag: 'getRoles',
      });
    }

    return res.data;
  } catch (error: any) {
    ;

    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
