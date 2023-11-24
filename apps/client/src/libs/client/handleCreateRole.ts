import { host } from '@client/config/host.config';
import { Role } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from './handleRevalidate';

export default async function handleCreateRole(values: Partial<Role>) {
  try {
    const token = getCookie('token');
    const payloadData = {
      name: values.name,
      description: values.description,
      code: values.code,
      scop: values.scop,
    };
    if (typeof token === 'undefined') {
      return;
    }

    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = values.spaceName
      ? `${host}/roles/${values.spaceName}`
      : `${host}/roles`;
    const res = await axios.post(url, payloadData, payload);

    handleRevalidate({
      'path[0]': '/roles',
      'path[1]': `/spaces/roles`,
      'tag[0]': 'getSpaces',
      'tag[1]': 'getRoles',
    });

    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
