import { Category, Event } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

export default async function getEventDetails(eventId: string) {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/events/${eventId}?populate=space&populate=category`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getEventDetails/${eventId}`], revalidate: 3600 * 12 },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);
    if (res.status === 404) {
      return redirect('/not-found')
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { event } = (await res.json()) as { event: (Event & { category: Category })[] };
  if (!event) {
    return redirect('/not-found')
  }
  return event;
}

