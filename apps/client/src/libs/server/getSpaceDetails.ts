import { Blog, Category, Event, Role, Space, User } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';
import { UserWithProfile } from 'types/user';

async function getSpaceDetails(spaceName: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/spaces/${spaceName}?populate=users&populate=roles&populate=events&populate=blogs`;
  console.log(url);

  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getSpaceDetails/${spaceName}`], revalidate: 3600 * 12 },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

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
  return space;
}

export default getSpaceDetails;
