import { cookies } from 'next/headers';
import { host } from '../../config/host.config';
import 'server-only';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

async function getEvents() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/events`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getEvents'] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { roles } = (await res.json()) as { roles: Role[] };
  return roles;
}

export default getEvents;
