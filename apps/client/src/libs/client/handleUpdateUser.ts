import { UserFormType } from '@client/components/Forms/UserForm/UserForm';
import { host } from '@client/config/host.config';
import getFieldsData from '@libs/utils/getFieldsData';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from './handleRevalidate';

export default async function handleUpdateUser(
  userId: string,
  values: {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    password?: string | undefined;
    addSpaces?: string[];
    addRoles?: string[];
    removeSpaces?: string[];
    removeRoles?: string[];
    setSpaces?: string[];
    setRoles?: string[];
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const url = `${host}/users/${userId}`;
    const fields = [
      'first_name',
      'last_name',
      'username',
      'email',
      'password',
      'addSpaces',
      'addRoles',
      'removeSpaces',
      'removeRoles',
      'setSpaces',
      'setRoles',
    ];
    const payloadData = getFieldsData(values, fields);

    if (typeof token === 'undefined') {
      return;
    }
    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(url, payloadData, payload);

    const revalidate: any = {
      'path[0]': '/users',
      'path[1]': `/users/${userId}`,
      'path[2]': `/roles`,
      'path[3]': `/spaces`,
      'path[4]': `/roles/users`,
      'path[5]': `/spaces/users`,
      'tag[0]': 'getUsers',
      'tag[1]': `getUserDetails/${userId}`,
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
