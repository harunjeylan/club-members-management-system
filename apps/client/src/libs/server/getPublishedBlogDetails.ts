import { redirect } from 'next/navigation';
import 'server-only';
import { BlogWithAll } from 'types/blog';
import { host } from '../../config/host.config';

async function getPublishedBlogDetails(slug: string) {
  const url = `${host}/blogs/published/${slug}?populate=space&populate=category&populate=image&populate=author`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getBlogDetails/${slug}`], revalidate: 3600 * 12 },
  });

  if (!res.ok) {
    console.log(res);
    if (res.status === 404) {
      return redirect('/not-found');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { blog } = (await res.json()) as { blog: BlogWithAll };
  if (!blog) {
    return redirect('/not-found');
  }
  return blog;
}

export default getPublishedBlogDetails;
