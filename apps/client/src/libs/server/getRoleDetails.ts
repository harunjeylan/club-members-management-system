import { Role, Space, User } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

export default async function getRoleDetails(roleId: string) {
  console.log(roleId);

  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/roles/${roleId}?populate=users&populate=space`;
  console.log(url);

  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getRoleDetails/${roleId}`],  revalidate: 3600 * 12   },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { role } = (await res.json()) as { role: Role & { users: User[] } };
  return role;
}
