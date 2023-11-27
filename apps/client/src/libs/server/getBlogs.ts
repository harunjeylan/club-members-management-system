import { Category, Blog, FileModel, Space } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';
import { BlogWithAll } from 'types/blog';

async function getBlogs() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/blogs?populate=space&populate=category&populate=image&populate=author`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getBlogs'],   revalidate: 3600 * 12  },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    
  });

  if (!res.ok) {
    console.log(res);
    if (res.status === 404) {
      return redirect('/not-found')
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { blogs } = (await res.json()) as { blogs: BlogWithAll[] };
  if (!blogs) {
    return redirect('/not-found')
  }
  return blogs;
}

export default getBlogs;
