import { Category, Blog } from '@prisma/client';
import 'server-only';
import { host } from '../../config/host.config';

async function getPublishedBlogDetails(blogId: string) {
  const url = `${host}/blogs/${blogId}?populate=space&populate=category`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getBlogDetails/${blogId}`], revalidate: 3600 * 12 },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { blogs } = (await res.json()) as { blogs: (Blog & { category: Category })[] };
  return blogs;
}

export default getPublishedBlogDetails;
