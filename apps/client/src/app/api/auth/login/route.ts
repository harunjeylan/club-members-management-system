import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { UserWithRoles } from 'types/user';
import { server_host } from '../../../../config/host.config';

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();
  const url = `${server_host}/auth/login`;
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
    cookies().set({ name: 'token', value: jwt.access, secure: true });
    cookies().set({ name: 'userId', value: user.id, secure: true });

    return Response.json({ user, jwt });
  } catch (error: any) {
    
    if (error?.response?.data) {
      return Response.json({
        status: error.response.data.status,
        message: error.response.data.message,
      });
    } else {
      return Response.json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
