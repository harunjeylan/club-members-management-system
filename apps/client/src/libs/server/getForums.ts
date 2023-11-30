import { Forum } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { UserWithProfile } from 'types/user';
import { server_host } from '../../config/host.config';

async function getForums() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/forums?populate=space&populate=author`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getForums'] },
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

  const { forums } = (await res.json()) as {
    forums: (Forum & { author: UserWithProfile })[];
  };
  if (!forums) {
    return redirect('/not-found');
  }
  return forums;
}

export default getForums;
