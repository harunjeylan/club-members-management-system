import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { host } from '../../config/host.config';

export default async function getDashboard() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${host}/dashboard?populate=spaces&populate=categories&populate=users&populate=superAdmins&populate=superEditors&populate=spaceAdmins&populate=spaceEditors&populate=events&populate=blogs`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getDashboard'], revalidate: 3600 * 12 },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    console.log(res);

    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return (await res.json()) as {
    spaces?: number;
    categories?: number;
    blogs?: number;
    users?: number;
    superAdmins?: number;
    superEditors?: number;
    spaceAdmins?: number;
    spaceEditors?: number;
    events?: number;
  };
}
