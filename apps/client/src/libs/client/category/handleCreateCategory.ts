import { server_host } from '@client/config/host.config';
import { Category } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleCreateCategory(values: Partial<Category>) {
  try {
    const token = getCookie('token');
    const url = `${server_host}/categories`;
    const payloadData = {
      name: values.name,
      mainCategoryId: values.categoryId,
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

    handleRevalidate({
      path: '/categories',
      tag: 'getCategories',
    });

    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
