import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';
import { Category } from '@prisma/client';

async function getCategories() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/categories`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getCategories'],  revalidate: 3600 * 12  },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    
  });

  if (!res.ok) {
    console.log(res);

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
  return categories;
}

export default getCategories;
