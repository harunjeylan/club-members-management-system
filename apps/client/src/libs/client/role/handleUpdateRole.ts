import { host } from '@client/config/host.config';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';
import getFieldsData from '@libs/utils/getFieldsData';

export default async function handleUpdateRole(
  roleId: string,
  values: {
    id?: string;
    name?: string;
    description?: string;
    scop?: RoleScop;
    code?: RoleCode;
    spaceName?: string;
    addUsers?: string[];
    removeUsers?: string[];
    setUsers?: string[];
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');

    if (typeof token === 'undefined') {
      return;
    }
    const fields = [
      'name',
      'description',
      'code',
      'scop',
      'spaceName',
      'addUsers',
      'removeUsers',
      'setUsers',
    ];
    const payloadData = getFieldsData(values, fields);
    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${host}/roles/${roleId}`;
    const res = await axios.put(url, payloadData, payload);
    const revalidate: any = {
      'path[0]': '/roles',
      'path[1]': `/roles/${roleId}`,
      'path[2]': `/spaces/roles`,
      'path[3]': `/spaces/roles/${values.spaceName}`,
      'tag[0]': 'getSpaces',
      'tag[1]': 'getRoles',
      'tag[2]': `getRoleDetails/${roleId}`,
      'tag[3]': `getSpaceDetails/${values.spaceName}`,
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
