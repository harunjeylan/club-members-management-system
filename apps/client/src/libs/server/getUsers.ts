import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { UserWithAll } from 'types/user';
import { server_host } from '../../config/host.config';

async function getUsers() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/users?populate=profile&populate=roles&populate=spaces`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getUsers'] },
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

  const { users } = (await res.json()) as { users: UserWithAll[] };
  if (!users) {
    return redirect('/not-found');
  }
  return users;
}

export default getUsers;
