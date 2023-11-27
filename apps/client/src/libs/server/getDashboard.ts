import getMainUserRoles from '@client/helpers/getMainUserRoles';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { UserWithAll } from 'types/user';
import { host } from '../../config/host.config';

export default async function getDashboard(user?: UserWithAll | null) {
  const cookieStore = cookies();
  const headers: { [key: string]: string } = {};
  let baseUser = `${host}/dashboard/public`;
  if (cookieStore.has('token') && user) {
    const token = cookieStore.get('token') as { value: string };
    headers['Authorization'] = `Bearer ${token.value}`;

    const { memberRoles, spaceRoles, superAdminRoles } = getMainUserRoles(user);
    // if (!!memberRoles.length) {
    //   baseUser = `${host}/dashboard/members`;
    // }
    // if (!!spaceRoles.length) {
    //   baseUser = `${host}/dashboard/space-admins`;
    // }
    if (!!superAdminRoles.length) {
      baseUser = `${host}/dashboard/super-admins`;
    }
  }
  const url =
    baseUser +
    `?populate=spaces&populate=categories&populate=users&populate=superAdmins&populate=superEditors&populate=spaceAdmins&populate=spaceEditors&populate=events&populate=blogs`;

  const res = await fetch(url, {
    method: 'GET',
    next: { tags: ['getDashboard'] },
    headers: headers,
  });

  if (!res.ok) {
    console.log(res);
    if (res.status === 404) {
      return redirect('/not-found');
    }
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
