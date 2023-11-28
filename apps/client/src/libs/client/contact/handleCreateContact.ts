import { server_host } from '@client/config/host.config';
import { Contact } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleCreateContact(
  values: Partial<Contact>,
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const payloadData = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };
    if (typeof token === 'undefined') {
      return;
    }

    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${server_host}/contacts`;
    const res = await axios.post(url, payloadData, payload);
    const revalidate: any = {
      'tag[1]': 'getContacts',
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
