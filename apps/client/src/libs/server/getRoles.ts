import { cookies } from 'next/headers';
import { host } from '../../config/host.config';
import 'server-only';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

async function getRoles() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/roles`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getRoles'], revalidate: 3600 * 12 * 7  },
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

export default getRoles;
