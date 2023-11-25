import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from './handleRevalidate';
import getFieldsData from '@libs/utils/getFieldsData';

export default async function handleUpdateSpace(
  spaceName: string,
  values: Partial<{
    name?: string;
    isPrivate?: boolean;
    description?: string | null;
    fileModelId?: string | null;
    addUsers?: string[];
    addRoles?: string[];
    removeUsers?: string[];
    removeRoles?: string[];
    setUsers?: string[];
    setRoles?: string[];
  }>
) {
  try {
    const token = getCookie('token');
    const url = `${host}/spaces/${spaceName}`;
    if (typeof token === 'undefined') {
      return;
    }
    const fields = [
      'name',
      'isPrivate',
      'description',
      'fileModelId',
      'addUsers',
      'addRoles',
      'removeUsers',
      'removeRoles',
      'setUsers',
      'setRoles',
    ];
    const payloadData = getFieldsData(values, fields);
    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(url, payloadData, payload);

    handleRevalidate({
      'path[0]': '/spaces',
      'path[1]': `/spaces/${spaceName}`,
      'tag[0]': 'getSpaces',
      'tag[1]': `getSpaceDetails/${spaceName}`,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
