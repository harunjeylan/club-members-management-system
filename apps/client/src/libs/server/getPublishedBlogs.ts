import { redirect } from 'next/navigation';
import 'server-only';
import { BlogWithAll } from 'types/blog';
import { host } from '../../config/host.config';

async function getPublishedBlogs() {
  const url = `${host}/blogs/published?populate=space&populate=category&populate=image&populate=author`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getPublishedBlogs'], revalidate: 3600 * 12 },
  });

  if (!res.ok) {
    console.log(res);
    if (res.status === 404) {
      return redirect('/not-found');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { blogs } = (await res.json()) as { blogs: BlogWithAll[] };
  if (!blogs) {
    return redirect('/not-found');
  }
  return blogs;
}

export default getPublishedBlogs;
