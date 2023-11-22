import { Space } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

async function getSpaceDetails(spaceName: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/spaces/${spaceName}`;
  console.log(url);
  
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getSpaces'] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { space } = (await res.json()) as { space: Space };
  return space;
}

export default getSpaceDetails;
