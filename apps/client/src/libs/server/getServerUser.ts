import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import 'server-only';
import { UserWithProfileAndRoles } from 'types/user';
import { host } from '../../config/host.config';

async function getServerUser() {
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
        next: { tags: ['currentUserDetails'], revalidate: 3600 * 12 * 7 },
      });
      if (!res.ok) {
        return null;
      }
      const data = (await res.json()) as { user: UserWithProfileAndRoles };

      return data.user;
    } catch (error) {

      return null;
    }
  } else {
    revalidateTag('user-data');
    return null;
  }
}

export default getServerUser;