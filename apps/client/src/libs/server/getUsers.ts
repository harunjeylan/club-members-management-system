import { cookies } from 'next/headers';
import { host } from '../../config/host.config';
import 'server-only';
import { redirect } from 'next/navigation';
import { UserWithAll, UserWithProfileAndRoles } from 'types/user';

async function getUsers() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/users?populate=profile&populate=roles&populate=spaces`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getUsers'], revalidate: 3600 * 12 * 7  },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { users } = (await res.json()) as { users: UserWithAll[] };
  return users;
}

export default getUsers;
