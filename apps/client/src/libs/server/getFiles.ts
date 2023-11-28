import { FileModel } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { server_host } from '../../config/host.config';

export default async function getFiles() {
  const cookieStore = cookies();
  if (!cookieStore.has('token')) {
    return redirect('/auth/login');
  }
  const token = cookieStore.get('token') as { value: string };
  const url = `${server_host}/files`;
  const res = await fetch(url, {
    method: 'GET',
    next: { tags: [`getFiles`] },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    ;
    if (res.status === 404) {
      return redirect('/not-found');
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const { files } = (await res.json()) as {
    files: FileModel[];
  };
  if (!files) {
    return redirect('/not-found');
  }
  return files;
}
