import { redirect } from 'next/navigation';
import 'server-only';
import { BlogWithAll } from 'types/blog';
import { server_host } from '../../config/host.config';

async function getPublishedBlogDetails(slug: string) {
  const url = `${server_host}/blogs/published/${slug}?populate=space&populate=category&populate=image&populate=author`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getPublishedBlogDetails/${slug}`], revalidate: 3600 * 12 },
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

  const { blog } = (await res.json()) as { blog: BlogWithAll };
  if (!blog) {
    return redirect('/not-found');
  }
  return blog;
}

export default getPublishedBlogDetails;
