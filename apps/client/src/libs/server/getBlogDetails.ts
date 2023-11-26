import { Blog, Category } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

export default async function getBlogDetails(slug: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/blogs/${slug}?populate=space&populate=category`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getBlogDetails/${slug}`], revalidate: 3600 * 12 },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { blog } = (await res.json()) as {
    blog: Blog & { category: Category };
  };
  return blog;
}
