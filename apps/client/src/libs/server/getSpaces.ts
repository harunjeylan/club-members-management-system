import { Space } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

async function getSpaces() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/spaces`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getSpaces'], revalidate: 3600 * 12 * 7  },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { spaces } = (await res.json()) as { spaces: Space[] };
  return spaces;
}

export default getSpaces;
