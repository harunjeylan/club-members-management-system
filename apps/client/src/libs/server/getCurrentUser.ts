import { cookies } from 'next/headers';
import 'server-only';
import { UserWithAll } from 'types/user';
import { server_host } from '../../config/host.config';
import { redirect } from 'next/navigation';

async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (token?.value) {
    try {
      const url = `${server_host}/users/me?populate=profile&populate=roles`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        next: { tags: ['getCurrentUser'] },
      });
      if (!res.ok) {
        if (res.status === 403) {
          return redirect('/forbidden');
        }
        return null;
      }
      const data = (await res.json()) as { user: UserWithAll };

      return data.user;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
}

export default getCurrentUser;
