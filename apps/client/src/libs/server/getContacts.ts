import { Contact } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

export default async function getContacts() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/contacts`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getContacts`], revalidate: 3600 * 12 },
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

  const { contacts } = (await res.json()) as {
    contacts: Contact[];
  };
  if (!contacts) {
    return redirect('/not-found')
  }
  return contacts;
}
