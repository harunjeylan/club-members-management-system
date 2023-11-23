import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export default async function handleAssignUsersRole(
  roleId: string,
  users: string[]
) {
  try {
    const token = getCookie('token');
    const url = `${host}/roles/${roleId}/users`;
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
    return res.data;
  } catch (error) {
    //@ts-ignore
    return { error: error?.response?.data?.message ?? 'Unknown Error' };
  }
}
