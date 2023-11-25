import { Category, Event } from '@prisma/client';
import 'server-only';
import { host } from '../../config/host.config';

async function getPublishedEvents() {
  const url = `${host}/events/published?populate=space&populate=category`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getPublishedEvents'], revalidate: 3600 * 12 },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { events } = (await res.json()) as { events: (Event & { category: Category })[] };
  return events;
}

export default getPublishedEvents;
