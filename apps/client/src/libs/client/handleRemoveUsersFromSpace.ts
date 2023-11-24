import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import handleRevalidate from './handleRevalidate';

export default async function handleRemoveUsersFromSpace(
  spaceName: string,
  users: string[]
) {
  try {
    const token = getCookie('token');
    const url = `${host}/spaces/${spaceName}/users/remove`;
    const payloadData = {
      users: users,
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

    handleRevalidate({
      path: '/spaces',
      tag: 'getSpaces',
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
