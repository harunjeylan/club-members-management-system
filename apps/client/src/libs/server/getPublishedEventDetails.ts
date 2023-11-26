import { Category, Event } from '@prisma/client';
import 'server-only';
import { host } from '../../config/host.config';

async function getPublishedEventDetails(eventId: string) {
  const url = `${host}/events/${eventId}?populate=space&populate=category`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getPublishedEventDetails/${eventId}`], revalidate: 3600 * 12 },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { event } = (await res.json()) as { event: (Event & { category: Category })[] };
  return event;
}

export default getPublishedEventDetails;
