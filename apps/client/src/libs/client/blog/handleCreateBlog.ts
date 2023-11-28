import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleCreateBlog(
  values: {
    title: string;
    slug: string;
    published: boolean;
    description: string;
    content: string;
    keyword: string;
    categoryId: string;
    spaceName: string;
    fileModelId: string;
  },
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  ;

  try {
    const token = getCookie('token');
    const url = `${server_host}/blogs`;
    const payloadData = {
      title: values.title,
      slug: values.slug,
      published: values.published,
      description: values.description,
      content: values.content,
      keyword: values.keyword,
      categoryId: values.categoryId,
      spaceName: values.spaceName,
      fileModelId: values.fileModelId,
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
      path: '/blogs',
      tag: 'getBlogs',
      'tag[1]': 'getPublishedBlogs',
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
