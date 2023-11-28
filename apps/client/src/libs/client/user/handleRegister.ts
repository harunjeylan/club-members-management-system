import axios from 'axios';
import { setToken, setUser } from '../../features/userSlice';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';

export default async function handleRegister(
  values: {
    first_name: string,
    last_name: string,
    username: string;
    email: string;
    password: string;
  },
  dispatch: Dispatch<AnyAction>,
  callback = () => {}
) {
  try {
    const url = `/api/auth/register`;
    const res = await axios.post(url, {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      email: values.email,
      password: values.password,
    });
    if (res.data.user || res.data.jwt) {
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.jwt));
      callback();
    }
    if (res?.data?.errors) {
      return { errors:res?.data?.errors };
    }
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
