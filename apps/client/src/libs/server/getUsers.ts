import { cookies } from 'next/headers';
import { host } from '../../config/host.config';
import 'server-only';
import { redirect } from 'next/navigation';
import { UserWithProfileAndRoles } from 'types/user';

async function getUsers() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/users?populate=profile&populate=roles`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getRoles'] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { users } = (await res.json()) as { users: UserWithProfileAndRoles[] };
  return users;
}

export default getUsers;
