import { host } from '@client/config/host.config';
import { Role } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleCreateRole(
  values: Partial<Role>,
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const payloadData = {
      name: values.name,
      description: values.description,
      code: values.code,
      scop: values.scop,
      spaceName: values.spaceName,
    };
    if (typeof token === 'undefined') {
      return;
    }

    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${host}/roles`;
    const res = await axios.post(url, payloadData, payload);
    const revalidate: any = {
      'path[0]': '/roles',
      'path[1]': `/spaces/roles`,
      'path[2]': `/spaces/roles/${values.spaceName}`,
      'tag[0]': 'getSpaces',
      'tag[1]': 'getRoles',
      'tag[2]': `getSpaceDetails/${values.spaceName}`,
    };
    revalidateOptions?.tags?.forEach((tag, ind) => {
      revalidate['tag[' + (6 + ind) + ']'] = tag;
    });
    revalidateOptions?.paths?.forEach((path, ind) => {
      revalidate['path[' + (6 + ind) + ']'] = path;
    });
    handleRevalidate(revalidate);

    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
