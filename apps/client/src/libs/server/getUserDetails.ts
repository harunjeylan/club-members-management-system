import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { UserWithAll } from 'types/user';
import { server_host } from '../../config/host.config';

export default async function getUserDetails(userId: string) {
  ;

  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/users/${userId}?populate=profile&populate=roles&populate=spaces`;
  ;

  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getUserDetails/${userId}`] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    ;
    if (res.status === 404) {
      return redirect('/not-found');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { user } = (await res.json()) as {
    user: UserWithAll & { users: User[] };
  };
  if (!user) {
    return redirect('/not-found');
  }
  return user;
}
