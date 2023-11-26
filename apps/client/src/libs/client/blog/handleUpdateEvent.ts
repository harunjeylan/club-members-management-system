import { host } from '@client/config/host.config';
import { Blog, Repeat } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';
import getFieldsData from '@libs/utils/getFieldsData';

export default async function handleUpdateBlog(
  slug: string,
  values: {
    title?: string;
    slug?: string;
    published?: boolean;
    description?: string;
    content?: string;
    keyword?: string;
    categoryId?: string;
    spaceName?: string;
    fileModelId?: string;
    authorId?: string;
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    const url = `${host}/blogs/${slug}`;

    if (typeof token === 'undefined') {
      return;
    }
    const fields = [
      'title',
      'slug',
      'published',
      'description',
      'content',
      'keyword',
      'categoryId',
      'spaceName',
      'fileModelId',
      'authorId',
    ];
    const payloadData = getFieldsData(values, fields);
    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(url, payloadData, payload);
    const revalidate: any = {
      'path[0]': '/blogs',
      'path[1]': `/blogs/${slug}`,
      'path[3]': `/spaces/blogs/${values.spaceName}`,
      'tag[0]': 'getBlogs',
      'tag[1]': `getBlogDetails/${slug}`,
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
