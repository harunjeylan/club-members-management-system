import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { BlogWithAll } from 'types/blog';
import { host } from '../../config/host.config';
export default async function getBlogDetails(slug: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/blogs/${slug}?populate=space&populate=category&populate=image&populate=author`;
  console.log('url ---> ', url);

  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getBlogDetails/${slug}`] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  // console.log(res);
  if (!res.ok) {
    if (res.status === 404) {
      return redirect('/not-found');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { blog } = (await res.json()) as {
    blog: BlogWithAll;
  };
  if (!blog) {
    return redirect('/not-found');
  }
  return blog;
}
