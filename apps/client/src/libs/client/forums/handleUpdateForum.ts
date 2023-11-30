import { server_host } from '@client/config/host.config';
import getFieldsData from '@libs/utils/getFieldsData';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';
import { ForumScop } from '@prisma/client';

export default async function handleUpdateForum(
  slug: string,
  values: {
    title?: string;
    description?: string;
    spaceName?: string;
    scop?: ForumScop;
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const url = `${server_host}/forums/${slug}`;

    if (typeof token === 'undefined') {
      return;
    }
    const fields = [
      'title',
      'description',
      'spaceName',
      'scop',
    ];
    const payloadData = getFieldsData(values, fields);
    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(url, payloadData, payload);
    const revalidate: any = {
      'path[0]': '/forums',
      'path[1]': `/forums/${slug}`,
      'path[3]': `/spaces/forums/${values.spaceName}`,
      'tag[0]': 'getForums',
      'tag[1]': `getForumDetails/${slug}`,
      'tag[3]': `getSpaceDetails/${values.spaceName}`,
      'tag[2]': `getForumDetails/${slug}`,
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
