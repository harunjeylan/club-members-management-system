import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';

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
    if (spaceName === 'string') {
      res = await axios.delete(`${host}/spaces/${spaceName}`, payload);
    } else {
      res = await axios.put(
        `${host}/spaces`,
        { spaceNames: spaceName },
        payload
      );
    }
    return res.data;
  } catch (error) {
    //@ts-ignore
    return { error: error?.response?.data?.message ?? 'Unknown Error' };
  }
}
