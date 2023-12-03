import { Category, Event } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { server_host } from '../../config/host.config';

async function getEvents() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/events?populate=space&populate=category`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getEvents'] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) { 
    if (res.status === 404) {
      return redirect('/not-found');
    }
    if (res.status === 403) {
      return redirect('/forbidden');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { events } = (await res.json()) as {
    events: (Event & { category: Category })[];
  };
  if (!events) {
    return redirect('/not-found');
  }
  return events;
}

export default getEvents;
