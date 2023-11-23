import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export default async function handleUpdateUser(userId:string, values: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  roles: string[];
  spaces: string[];
}) {
  try {
    const token = getCookie('token');
    const url = `${host}/users/${userId}`;

    const payloadData = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      email: values.email,
      roles: values.roles,
      spaces: values.spaces,
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
