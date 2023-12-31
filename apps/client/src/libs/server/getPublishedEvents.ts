import { Category, Event } from '@prisma/client';
import { redirect } from 'next/navigation';
import 'server-only';
import { server_host } from '../../config/host.config';

async function getPublishedEvents() {
  const url = `${server_host}/events/published?populate=space&populate=category`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getPublishedEvents'], revalidate: 3600 * 12 },
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

export default getPublishedEvents;
