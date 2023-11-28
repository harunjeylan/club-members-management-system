import { Blog, Category, Event, Role, Space } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { UserWithProfile } from 'types/user';
import { server_host } from '../../config/host.config';

async function getSpaceDetails(spaceName: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/spaces/${spaceName}?populate=users&populate=roles&populate=events&populate=blogs`;
  ;

  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getSpaceDetails/${spaceName}`] },
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

  const { space } = (await res.json()) as {
    space: Space & {
      users: UserWithProfile[];
      roles: Role[];
      events: (Event & { category: Category })[];
      blogs: (Blog & { category: Category })[];
    };
  };
  if (!space) {
    return redirect('/not-found');
  }
  return space;
}

export default getSpaceDetails;
