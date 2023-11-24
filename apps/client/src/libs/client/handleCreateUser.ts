import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from './handleRevalidate';

export default async function handleCreateUser(values: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}) {
  try {
    const token = getCookie('token');
    const url = `${host}/users`;

    const payloadData = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      email: values.email,
      password: values.password,
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
    handleRevalidate({
      path: '/users',
      tag: 'getUsers',
    });
    
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
