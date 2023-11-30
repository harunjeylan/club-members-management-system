import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';
import { ForumScop } from '@prisma/client';

export default async function handleCreateForum(
  values: {
    title: string;
    description: string;
    spaceName?: string;
    scop: ForumScop;
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const url = `${server_host}/forums`;
    const payloadData = {
      title: values.title,
      description: values.description,
      spaceName: values.spaceName,
      scop:values.scop
    };
    if (typeof token === 'undefined') {
      return;
    }

    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(url, payloadData, payload);
    const revalidate: any = {
      path: '/forums',
      tag: 'getForums',
      'tag[1]': 'getPublishedForums',
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
