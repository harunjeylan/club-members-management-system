import { cookies } from 'next/headers';
import { host } from '../../config/host.config';
import 'server-only';
import { redirect } from 'next/navigation';
import { UserWithProfileAndRoles } from 'types/user';

async function getSpaceUsers(spaceName: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/spaces/${spaceName}/users?populate=profile&populate=roles`;
  console.log(url);
  
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

export default getSpaceUsers;
