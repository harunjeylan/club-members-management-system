import { cookies } from 'next/headers';
import { host } from '../../../../config/host.config';
import axios, { AxiosError } from 'axios';
import { NextRequest } from 'next/server';
import { UserWithRoles } from 'types/user';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();
  const url = `${host}/auth/login`;
  const payload = {
    identifier,
    password,
  };
  try {
    const response = await axios.post<{
      user: UserWithRoles;
      jwt: { access: string; refresh: string };
    }>(url, payload);

    const { user, jwt } = response.data;
    cookies().set('token', jwt.access);
    cookies().set('userId', user.id);
    revalidateTag('currentUserDetails');
    return Response.json({ user, jwt });
  } catch (error: any) {
    if (error?.response?.data?.error) {
      return Response.json({
        status: error.response.data.error.status,
        message: error.response.data.error.message,
      });
    } else {
      return Response.json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
