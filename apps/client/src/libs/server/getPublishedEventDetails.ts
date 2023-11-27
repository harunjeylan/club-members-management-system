import { Category, Event } from '@prisma/client';
import 'server-only';
import { host } from '../../config/host.config';
import { redirect } from 'next/navigation';

async function getPublishedEventDetails(eventId: string) {
  const url = `${host}/events/${eventId}?populate=space&populate=category&populate=image&populate=author`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getPublishedEventDetails/${eventId}`], revalidate: 3600 * 12 },
  });

  if (!res.ok) {
    console.log(res);
    if (res.status === 404) {
      return redirect('/not-found')
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { event } = (await res.json()) as { event: (Event & { category: Category }) };
  if (!event) {
    return redirect('/not-found')
  }
  return event;
}

export default getPublishedEventDetails;
