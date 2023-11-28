import { cookies } from 'next/headers';
import axios from 'axios';
import { NextRequest } from 'next/server';
import { UserWithRoles } from 'types/user';
import { server_host } from '../../../../config/host.config';
import { revalidateTag } from 'next/cache';
export async function POST(req: NextRequest) {
  const { password, username, email } = await req.json();
  const url = `${server_host}/users/register`;
  const payload = {
    password,
    username,
    email,
  };
  try {
    const response = await axios.post<{
      user: UserWithRoles;
      jwt: { access: string; refresh: string };
    }>(url, payload);
    const { user, jwt } = response.data;
    cookies().set({ name: 'token', value: jwt.access, secure: true });
    cookies().set({ name: 'userId', value: user.id, secure: true });
    try {
      revalidateTag('currentUserDetails');
    } catch (e) {}
    return Response.json({ user, jwt });
  } catch (error: any) {
    return Response.json(error?.response?.data);
  }
}
