import { host } from '@client/config/host.config';
import { Role } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from './handleRevalidate';

export default async function handleUpdateRole(
  roleId: string,
  values: Partial<Role>
) {
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
      ? `${host}/spaces/${values.spaceName}/roles/${roleId}`
      : `${host}/roles/${roleId}`;
    const res = await axios.put(url, payloadData, payload);

    handleRevalidate({
      'path[0]': '/roles',
      'path[1]': `/roles/${roleId}`,
      'tag[0]': 'getRoles',
      'tag[1]': `getRoleDetails/${roleId}`,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
