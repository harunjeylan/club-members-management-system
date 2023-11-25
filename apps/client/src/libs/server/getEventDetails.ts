import { Event } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

async function getEvents(eventId: string) {
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

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { events } = (await res.json()) as { events: Event[] };
  return events;
}

export default getEvents;
