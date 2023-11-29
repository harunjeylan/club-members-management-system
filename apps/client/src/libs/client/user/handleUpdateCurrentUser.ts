import { UserFormType } from '@client/components/Forms/UserForm/UserForm';
import { server_host } from '@client/config/host.config';
import getFieldsData from '@libs/utils/getFieldsData';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleUpdateCurrentUser(
  values: {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    profile?: {
      bio?: string;
      fileModelId?: string;
    };
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const url = `${server_host}/users/me`;
    const fields = ['first_name', 'last_name', 'username', 'email', 'profile'];
    const payloadData = getFieldsData(values, fields);
    if (payloadData['profile']) {
      payloadData['profile'] = getFieldsData(payloadData['profile'], [
        'bio',
        'fileModelId',
      ]);
    }

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
      'path[2]': `/roles`,
      'path[3]': `/spaces`,
      'path[4]': `/roles/users`,
      'path[5]': `/spaces/users`,
      'tag[0]': 'getUsers',
      'tag[1]': `getCurrentUser`,
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
