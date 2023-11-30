import { Category, Forum, Message } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { server_host } from '../../config/host.config';
import { MessageWithAll } from 'types/message';

export default async function getForumDetails(forumId: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/forums/${forumId}?populate=space&populate=author&populate=messages`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getForumDetails/${forumId}`] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      return redirect('/not-found');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { forum } = (await res.json()) as {
    forum: Forum & { messages: MessageWithAll[] };
  };
  if (!forum) {
    return redirect('/not-found');
  }
  return forum;
}
