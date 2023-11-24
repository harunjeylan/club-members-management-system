import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import 'server-only';
import { UserWithAll, UserWithProfileAndRoles } from 'types/user';
import { host } from '../../config/host.config';

async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (token?.value) {
    try {
      const url = `${host}/users/me?populate=profile&populate=roles`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        next: { tags: ['getCurrentUser'],  revalidate: 3600 * 12 },
        
      });
      if (!res.ok) {
        return null;
      }
      const data = (await res.json()) as { user: UserWithAll };

      return data.user;
    } catch (error) {

      return null;
    }
  } else {
    try {
      revalidateTag('getCurrentUser');
    } catch (e) {}
    return null;
  }
}

export default getCurrentUser
