import { Role, User } from '@prisma/client';
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
    next: { tags: [`getRoleDetails/${roleId}`] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);
    if (res.status === 404) {
      return redirect('/not-found');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { role } = (await res.json()) as { role: Role & { users: User[] } };
  if (!role) {
    return redirect('/not-found');
  }
  return role;
}
