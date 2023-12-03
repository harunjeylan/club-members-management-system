import { Category } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { server_host } from '../../config/host.config';

async function getCategories() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/categories`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getCategories'] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) { 
    if (res.status === 404) {
      return redirect('/not-found');
    }
    if (res.status === 403) {
      return redirect('/forbidden');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { categories } = (await res.json()) as {
    categories: {
      id: string;
      name: string;
      categoryId: string | null;
      categories: Category[];
    }[];
  };
  if (!categories) {
    return redirect('/not-found');
  }
  return categories;
}

export default getCategories;
